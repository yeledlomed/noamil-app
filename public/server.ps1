# Noam Campaign Local Web Server (Pure ASCII Source for 100% Windows Compatibility)
param([int]$Port = 8080)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $ScriptDir) { $ScriptDir = (Get-Location).Path }
Set-Location -LiteralPath $ScriptDir

$DataFile = Join-Path $ScriptDir "campaign_data.json"
$ConfigFile = Join-Path $ScriptDir "config.json"
$TargetsFile = Join-Path $ScriptDir "targets.json"
$RabbisFile = Join-Path $ScriptDir "rabbis.json"
$ClassMappingsFile = Join-Path $ScriptDir "class_mappings.json"
$ApartmentMappingsFile = Join-Path $ScriptDir "apartment_mappings.json"
$ApartmentsDataFile = Join-Path $ScriptDir "apartments_data.json"

# Detect Local IP Address
$LocalIP = "127.0.0.1"
try {
    $Socket = New-Object System.Net.Sockets.Socket([System.Net.Sockets.AddressFamily]::InterNetwork, [System.Net.Sockets.SocketType]::Dgram, [System.Net.Sockets.ProtocolType]::Udp)
    $Socket.Connect("8.8.8.8", 80)
    $LocalIP = ($Socket.LocalEndPoint).Address.ToString()
    $Socket.Close()
} catch {}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "       Noam Campaign - Local Web Server & Live Sync         " -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " * Local Access:       http://localhost:$Port" -ForegroundColor Green
if ($LocalIP -ne "127.0.0.1") {
    Write-Host " * WiFi / Network:     http://${LocalIP}:$Port" -ForegroundColor Green
}
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Close this window to stop the server." -ForegroundColor Gray
Write-Host ""

Start-Process "http://localhost:$Port"

$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add("http://localhost:$Port/")
$Listener.Prefixes.Add("http://127.0.0.1:$Port/")
if ($LocalIP -and $LocalIP -ne "127.0.0.1") {
    try { $Listener.Prefixes.Add("http://${LocalIP}:$Port/") } catch {}
}
try { $Listener.Prefixes.Add("http://+:$Port/") } catch {}

try {
    $Listener.Start()
} catch {
    $Listener = New-Object System.Net.HttpListener
    $Listener.Prefixes.Add("http://localhost:$Port/")
    $Listener.Prefixes.Add("http://127.0.0.1:$Port/")
    $Listener.Start()
}

function Get-ContentType($path) {
    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    if ($ext -eq ".html") { return "text/html; charset=utf-8" }
    if ($ext -eq ".css")  { return "text/css; charset=utf-8" }
    if ($ext -eq ".js")   { return "application/javascript; charset=utf-8" }
    if ($ext -eq ".json") { return "application/json; charset=utf-8" }
    if ($ext -eq ".png")  { return "image/png" }
    if ($ext -eq ".jpg")  { return "image/jpeg" }
    if ($ext -eq ".svg")  { return "image/svg+xml" }
    if ($ext -eq ".mp3")  { return "audio/mpeg" }
    return "application/octet-stream"
}

while ($Listener.IsListening) {
    try {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $Response.Headers.Add("Access-Control-Allow-Origin", "*")
        $Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        $Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")

        if ($Request.HttpMethod -eq "OPTIONS") {
            $Response.StatusCode = 200
            $Response.Close()
            continue
        }

        $RawPath = $Request.Url.AbsolutePath
        if ($RawPath -eq "/" -or $RawPath -eq "") {
            $RawPath = "/index.html"
        }

        # 1. GET /api/data - Return current dashboard JSON with targets
        if ($RawPath -eq "/api/data" -and $Request.HttpMethod -eq "GET") {
            $Response.ContentType = "application/json; charset=utf-8"
            if (Test-Path $DataFile) {
                try {
                    $DataObj = Get-Content -LiteralPath $DataFile -Raw -Encoding UTF8 | ConvertFrom-Json
                    if (Test-Path $TargetsFile) {
                        $DataObj.targets = Get-Content -LiteralPath $TargetsFile -Raw -Encoding UTF8 | ConvertFrom-Json
                    }
                    if (Test-Path $RabbisFile) {
                        # Wrap in @() so a single rabbi stays an array (PowerShell unwraps 1-item arrays)
                        $RabbisArr = @(Get-Content -LiteralPath $RabbisFile -Raw -Encoding UTF8 | ConvertFrom-Json | Where-Object { $_ -ne $null })
                        $DataObj | Add-Member -NotePropertyName rabbis -NotePropertyValue $RabbisArr -Force
                    }
                    if (Test-Path $ClassMappingsFile) {
                        $ClassObj = Get-Content -LiteralPath $ClassMappingsFile -Raw -Encoding UTF8 | ConvertFrom-Json
                        $DataObj | Add-Member -NotePropertyName classMappings -NotePropertyValue $ClassObj -Force
                    }
                    if (Test-Path $ApartmentMappingsFile) {
                        $AptObj = Get-Content -LiteralPath $ApartmentMappingsFile -Raw -Encoding UTF8 | ConvertFrom-Json
                        $DataObj | Add-Member -NotePropertyName apartmentMappings -NotePropertyValue $AptObj -Force
                    }
                    $Bytes = [System.Text.Encoding]::UTF8.GetBytes(($DataObj | ConvertTo-Json -Depth 10))
                } catch {
                    $Bytes = [System.IO.File]::ReadAllBytes($DataFile)
                }
            } else {
                $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{}")
            }
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # 2. GET /api/status - Server health check
        if ($RawPath -eq "/api/status" -and $Request.HttpMethod -eq "GET") {
            $Response.ContentType = "application/json; charset=utf-8"
            $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{`"status`":`"ok`",`"server`":`"powershell`"}")
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # 3. GET & POST /api/config - Cloudflare Token & Admin Settings
        if ($RawPath -eq "/api/config" -and $Request.HttpMethod -eq "GET") {
            $Response.ContentType = "application/json; charset=utf-8"
            if (Test-Path $ConfigFile) {
                $Bytes = [System.IO.File]::ReadAllBytes($ConfigFile)
            } else {
                $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{`"campaign_url`":`"https://sms-admin.talphotos.win/admin/campaigns/15`",`"cookie`":`"`"}")
            }
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        if ($RawPath -eq "/api/config" -and $Request.HttpMethod -eq "POST") {
            $Response.ContentType = "application/json; charset=utf-8"
            $Reader = New-Object System.IO.StreamReader($Request.InputStream, [System.Text.Encoding]::UTF8)
            $Body = $Reader.ReadToEnd()
            if ($Body) {
                [System.IO.File]::WriteAllText($ConfigFile, $Body, [System.Text.Encoding]::UTF8)
            }
            $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{`"success`":true}")
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # 4. GET /api/proxy - Proxy requests to admin with Cloudflare token
        if ($RawPath -eq "/api/proxy" -and $Request.HttpMethod -eq "GET") {
            $TargetUrl = $Request.QueryString["url"]
            $CookieVal = $Request.QueryString["cookie"]

            if (-not $CookieVal -and (Test-Path $ConfigFile)) {
                try {
                    $CfgObj = Get-Content -LiteralPath $ConfigFile -Raw -Encoding UTF8 | ConvertFrom-Json
                    $CookieVal = $CfgObj.cookie
                } catch {}
            }

            if ($TargetUrl) {
                try {
                    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
                    $HttpReq = [System.Net.HttpWebRequest]::Create($TargetUrl)
                    $HttpReq.Method = "GET"
                    $HttpReq.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
                    $HttpReq.Timeout = 15000

                    if ($CookieVal) {
                        $CleanCookie = $CookieVal.Trim()
                        if ($CleanCookie -notmatch "=") {
                            $CleanCookie = "CF_Authorization=" + $CleanCookie
                        }
                        $HttpReq.Headers.Add("Cookie", $CleanCookie)
                    }

                    $HttpRes = $HttpReq.GetResponse()
                    $Stream = $HttpRes.GetResponseStream()
                    $StreamReader = New-Object System.IO.StreamReader($Stream, [System.Text.Encoding]::UTF8)
                    $HtmlContent = $StreamReader.ReadToEnd()
                    $StreamReader.Close()
                    $Stream.Close()
                    $HttpRes.Close()

                    $Response.ContentType = "text/html; charset=utf-8"
                    $Response.StatusCode = 200
                    $Bytes = [System.Text.Encoding]::UTF8.GetBytes($HtmlContent)
                    $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
                    $Response.Close()
                    continue
                } catch {
                    $Response.StatusCode = 502
                    $Response.ContentType = "application/json; charset=utf-8"
                    $ErrDetail = $_.Exception.Message.Replace('"', '\"')
                    $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{`"error`":`"$ErrDetail`"}")
                    $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
                    $Response.Close()
                    continue
                }
            } else {
                $Response.StatusCode = 400
                $Response.Close()
                continue
            }
        }

        # 4a. GET/POST /api/class-mappings
        if ($RawPath -eq "/api/class-mappings") {
            $Response.ContentType = "application/json; charset=utf-8"
            if ($Request.HttpMethod -eq "POST") {
                $Reader = New-Object System.IO.StreamReader($Request.InputStream, [System.Text.Encoding]::UTF8)
                $Body = $Reader.ReadToEnd()
                if ($Body) {
                    try {
                        $Incoming = $Body | ConvertFrom-Json
                        $Curr = @{}
                        if (Test-Path $ClassMappingsFile) {
                            $RawJson = Get-Content -LiteralPath $ClassMappingsFile -Raw -Encoding UTF8
                            if ($RawJson) { $Curr = $RawJson | ConvertFrom-Json }
                        }
                        foreach ($prop in $Incoming.PSObject.Properties) {
                            $Curr | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value -Force
                        }
                        [System.IO.File]::WriteAllText($ClassMappingsFile, ($Curr | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                    } catch {}
                }
            }
            if (Test-Path $ClassMappingsFile) {
                $Bytes = [System.IO.File]::ReadAllBytes($ClassMappingsFile)
            } else {
                $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{}")
            }
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # 4b. GET/POST /api/apartments
        if ($RawPath -eq "/api/apartments") {
            $Response.ContentType = "application/json; charset=utf-8"
            if ($Request.HttpMethod -eq "POST") {
                $Reader = New-Object System.IO.StreamReader($Request.InputStream, [System.Text.Encoding]::UTF8)
                $Body = $Reader.ReadToEnd()
                if ($Body) {
                    try {
                        $Payload = $Body | ConvertFrom-Json
                        $Incoming = if ($Payload.PSObject.Properties['mappings']) { $Payload.mappings } else { $Payload }
                        $Curr = @{}
                        if (Test-Path $ApartmentMappingsFile) {
                            $RawJson = Get-Content -LiteralPath $ApartmentMappingsFile -Raw -Encoding UTF8
                            if ($RawJson) { $Curr = $RawJson | ConvertFrom-Json }
                        }
                        foreach ($prop in $Incoming.PSObject.Properties) {
                            $Curr | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value -Force
                        }
                        [System.IO.File]::WriteAllText($ApartmentMappingsFile, ($Curr | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                    } catch {}
                }
            }
            $Rows = @()
            if (Test-Path $ApartmentsDataFile) {
                try { $Rows = Get-Content -LiteralPath $ApartmentsDataFile -Raw -Encoding UTF8 | ConvertFrom-Json } catch {}
            }
            $Mappings = @{}
            if (Test-Path $ApartmentMappingsFile) {
                try { $Mappings = Get-Content -LiteralPath $ApartmentMappingsFile -Raw -Encoding UTF8 | ConvertFrom-Json } catch {}
            }
            $RespObj = @{ rows = $Rows; mappings = $Mappings }
            $Bytes = [System.Text.Encoding]::UTF8.GetBytes(($RespObj | ConvertTo-Json -Depth 5))
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # 5. POST /api/update - Update dashboard data from client
        if ($RawPath -eq "/api/update" -and $Request.HttpMethod -eq "POST") {
            $Response.ContentType = "application/json; charset=utf-8"
            $Reader = New-Object System.IO.StreamReader($Request.InputStream, [System.Text.Encoding]::UTF8)
            $Body = $Reader.ReadToEnd()
            if ($Body) {
                try {
                    $Parsed = $Body | ConvertFrom-Json
                    $ExistingData = Get-Content -LiteralPath $DataFile -Raw -Encoding UTF8 | ConvertFrom-Json
                    if ($Parsed.PSObject.Properties['targets']) {
                        [System.IO.File]::WriteAllText($TargetsFile, ($Parsed.targets | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                        $ExistingData.targets = $Parsed.targets
                        $DataToSave = $ExistingData | ConvertTo-Json -Depth 10
                        [System.IO.File]::WriteAllText($DataFile, $DataToSave, [System.Text.Encoding]::UTF8)
                    } elseif ($Parsed.PSObject.Properties['adminPassword']) {
                        $CurrTargets = @{}
                        if (Test-Path $TargetsFile) {
                            $CurrTargets = Get-Content -LiteralPath $TargetsFile -Raw -Encoding UTF8 | ConvertFrom-Json
                        }
                        $CurrTargets | Add-Member -NotePropertyName adminPassword -NotePropertyValue $Parsed.adminPassword -Force
                        [System.IO.File]::WriteAllText($TargetsFile, ($CurrTargets | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                        $ExistingData.targets = $CurrTargets
                        $DataToSave = $ExistingData | ConvertTo-Json -Depth 10
                        [System.IO.File]::WriteAllText($DataFile, $DataToSave, [System.Text.Encoding]::UTF8)
                    } elseif ($Parsed.PSObject.Properties['rabbis']) {
                        [System.IO.File]::WriteAllText($RabbisFile, ($Parsed.rabbis | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                        $ExistingData.rabbis = $Parsed.rabbis
                        $DataToSave = $ExistingData | ConvertTo-Json -Depth 10
                        [System.IO.File]::WriteAllText($DataFile, $DataToSave, [System.Text.Encoding]::UTF8)
                    } elseif ($Parsed.PSObject.Properties['classMappings']) {
                        [System.IO.File]::WriteAllText($ClassMappingsFile, ($Parsed.classMappings | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                    } elseif ($Parsed.PSObject.Properties['apartmentMappings']) {
                        [System.IO.File]::WriteAllText($ApartmentMappingsFile, ($Parsed.apartmentMappings | ConvertTo-Json -Depth 5), [System.Text.Encoding]::UTF8)
                    } elseif ($Parsed.PSObject.Properties['data']) {
                        # Do NOT touch targets here
                        if (Test-Path $TargetsFile) {
                            $ExistingData.targets = Get-Content -LiteralPath $TargetsFile -Raw -Encoding UTF8 | ConvertFrom-Json
                        }
                        $DataToSave = $ExistingData | ConvertTo-Json -Depth 10
                        [System.IO.File]::WriteAllText($DataFile, $DataToSave, [System.Text.Encoding]::UTF8)
                    }
                } catch {
                    [System.IO.File]::WriteAllText($DataFile, $Body, [System.Text.Encoding]::UTF8)
                }
            }
            $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{`"success`":true}")
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # 6. POST /api/sync - Sync trigger
        if ($RawPath -eq "/api/sync" -and ($Request.HttpMethod -eq "POST" -or $Request.HttpMethod -eq "GET")) {
            $Response.ContentType = "application/json; charset=utf-8"
            if (Test-Path $DataFile) {
                $RawContent = [System.IO.File]::ReadAllText($DataFile, [System.Text.Encoding]::UTF8)
                $Wrapped = "{`"success`":true,`"data`":$RawContent}"
                $Bytes = [System.Text.Encoding]::UTF8.GetBytes($Wrapped)
            } else {
                $Bytes = [System.Text.Encoding]::UTF8.GetBytes("{`"success`":true,`"data`":{}}")
            }
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.Close()
            continue
        }

        # Static File Serving
        $Sep = [System.IO.Path]::DirectorySeparatorChar.ToString()
        $DecodedPath = [System.Uri]::UnescapeDataString($RawPath)
        $CleanPath = $DecodedPath.TrimStart("/").Replace("/", $Sep)
        $FilePath = Join-Path $ScriptDir $CleanPath
        if (Test-Path $FilePath -PathType Leaf) {
            $Response.ContentType = Get-ContentType $FilePath
            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $Response.StatusCode = 404
            $Bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        }
        $Response.Close()
    } catch {
        # ignore transient socket disconnects
    }
}
