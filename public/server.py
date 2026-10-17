import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import os
import re
import socket
import sys
import threading
import time

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, 'config.json')
DATA_FILE = os.path.join(BASE_DIR, 'campaign_data.json')
TARGETS_FILE = os.path.join(BASE_DIR, 'targets.json')
RABBIS_FILE = os.path.join(BASE_DIR, 'rabbis.json')
STUDENTS_CSV_UPDATED = os.path.join(BASE_DIR, 'תלמידים מעודכן.csv')
STUDENTS_CSV_FALLBACK = os.path.join(BASE_DIR, 'תלמידים י אלול.csv')

def load_students_from_csv():
    import csv
    target_file = STUDENTS_CSV_UPDATED if os.path.exists(STUDENTS_CSV_UPDATED) else STUDENTS_CSV_FALLBACK
    if not os.path.exists(target_file):
        return []
    
    encodings = ['utf-8-sig', 'utf-8', 'cp1255', 'iso-8859-8']
    for enc in encodings:
        try:
            with open(target_file, 'r', encoding=enc) as f:
                reader = csv.reader(f)
                header = next(reader, None)
                if not header:
                    continue
                class_idx = 8
                for idx, h in enumerate(header):
                    if 'כיתה מוסד ראשי' in h:
                        class_idx = idx
                        break
                students = []
                for row in reader:
                    if len(row) > max(2, class_idx):
                        first = row[0].strip()
                        last = row[1].strip()
                        phone = row[2].strip()
                        cls = row[class_idx].strip() if class_idx < len(row) else ''
                        if first or last or phone:
                            students.append([first, last, phone, cls])
                if students:
                    return students
        except Exception:
            continue
    return []


def load_rabbis():
    if os.path.exists(RABBIS_FILE):
        try:
            with open(RABBIS_FILE, 'r', encoding='utf-8') as f:
                r = json.load(f)
                if isinstance(r, list):
                    return r
        except Exception:
            pass
    return []

def save_rabbis(rabbis_list):
    try:
        with open(RABBIS_FILE, 'w', encoding='utf-8') as f:
            json.dump(rabbis_list, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[!] שגיאה בשמירת rabbis.json: {e}")

# Initial default data matching live campaign
DEFAULT_DATA = {
    "campaign": {
        "id": 15,
        "name": "נעם לישראל · בראשות אבי מעוז",
        "group": "מדברה כעדן",
        "status": "פעיל"
    },
    "targets": {
        "totalCalls": 1000,
        "dailyCalls": 100,
        "leadsHandled": 471,
        "activeAgents": 15
    },
    "metrics": {
        "agentsCount": 221,
        "activeAgentsCount": 124,
        "activeRecently": 124,
        "callsToday": 6885,
        "callsTotal": 7496,
        "resultsMessage": ""
    },
    "overviewResults": {
        "supporters": 279,
        "supportersPct": 4,
        "threshold": 246,
        "thresholdPct": 3,
        "hesitant": 234,
        "hesitantPct": 3,
        "notSupporters": 2570,
        "notSupportersPct": 35,
        "noAnswer": 3308,
        "noAnswerPct": 45,
        "totalReported": 7349
    },
    "leadsTotal": 471,
    "leads": [],
    "agents": [
        {
            "id": 1,
            "name": "טוביה זר אביב",
            "phone": "053-5431148",
            "group": "מדברה כעדן",
            "account": "נוצר",
            "status": "חבר לשעבר (יצא לפני 57 דקות)",
            "statusType": "former",
            "leads_open": 1,
            "leads_today": 0,
            "reports_count": 0,
            "avg_time": "—",
            "fixes": 0,
            "released": 1,
            "skips": 0
        },
        {
            "id": 2,
            "name": "יהודה ורגון",
            "phone": "055-9985563",
            "group": "מדברה כעדן",
            "account": "נוצר",
            "status": "חבר לשעבר (יצא לפני 59 דקות)",
            "statusType": "former",
            "leads_open": 1,
            "leads_today": 0,
            "reports_count": 0,
            "avg_time": "—",
            "fixes": 0,
            "released": 1,
            "skips": 0
        },
        {
            "id": 3,
            "name": "ידידיה שנור",
            "phone": "055-9977313",
            "group": "מדברה כעדן",
            "account": "נוצר",
            "status": "חבר לשעבר (יצא היום 14:09)",
            "statusType": "former",
            "leads_open": 1,
            "leads_today": 1,
            "reports_count": 1,
            "avg_time": "—",
            "fixes": 0,
            "released": 1,
            "skips": 0
        },
        {
            "id": 4,
            "name": "יאיר שטראוס",
            "phone": "058-7788681",
            "group": "מדברה כעדן",
            "account": "נוצר",
            "status": "חבר לשעבר (יצא היום 13:49)",
            "statusType": "former",
            "leads_open": 1,
            "leads_today": 0,
            "reports_count": 0,
            "avg_time": "—",
            "fixes": 0,
            "released": 1,
            "skips": 0
        },
        {
            "id": 5,
            "name": "שגיא מאיר",
            "phone": "058-6071370",
            "group": "מדברה כעדן",
            "account": "נוצר",
            "status": "חבר לשעבר (יצא היום 10:26)",
            "statusType": "former",
            "leads_open": 1,
            "leads_today": 0,
            "reports_count": 1,
            "avg_time": "—",
            "fixes": 0,
            "released": 1,
            "skips": 0
        },
        {
            "id": 6,
            "name": "רועי לוי",
            "phone": "055-9970588",
            "group": "מדברה כעדן",
            "account": "לא נוצר",
            "status": "עובד בקמפיין",
            "statusType": "active",
            "leads_open": 0,
            "leads_today": 0,
            "reports_count": 0,
            "avg_time": "—",
            "fixes": 0,
            "released": 0,
            "skips": 0
        },
        {
            "id": 7,
            "name": "נעם חנון",
            "phone": "058-6699879",
            "group": "מדברה כעדן",
            "account": "נוצר",
            "status": "עובד בקמפיין",
            "statusType": "active",
            "leads_open": 0,
            "leads_today": 0,
            "reports_count": 0,
            "avg_time": "—",
            "fixes": 0,
            "released": 0,
            "skips": 0
        }
    ],
    "lastSync": "עודכן הרגע"
}

DEFAULT_TARGETS = {
    "totalCalls": 1000,
    "dailyCalls": 100,
    "leadsHandled": 471,
    "activeAgents": 15
}

def load_targets():
    if os.path.exists(TARGETS_FILE):
        try:
            with open(TARGETS_FILE, 'r', encoding='utf-8') as f:
                t = json.load(f)
                if isinstance(t, dict) and 'dailyCalls' in t:
                    return t
        except Exception:
            pass
    return DEFAULT_TARGETS

def save_targets(targets):
    try:
        with open(TARGETS_FILE, 'w', encoding='utf-8') as f:
            json.dump(targets, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[!] שגיאה בשמירת targets.json: {e}")

CLASS_MAPPINGS_FILE = os.path.join(BASE_DIR, 'class_mappings.json')
APARTMENTS_FILE_ACCURATE = os.path.join(BASE_DIR, 'תלמידים_עם_דירות_מדויק.csv')
APARTMENTS_FILE_DEFAULT = os.path.join(BASE_DIR, 'דירות.csv')
APARTMENTS_FILE = APARTMENTS_FILE_ACCURATE if os.path.exists(APARTMENTS_FILE_ACCURATE) else APARTMENTS_FILE_DEFAULT
APARTMENT_MAPPINGS_FILE = os.path.join(BASE_DIR, 'apartment_mappings.json')

def load_class_mappings():
    if os.path.exists(CLASS_MAPPINGS_FILE):
        try:
            with open(CLASS_MAPPINGS_FILE, 'r', encoding='utf-8') as f:
                res = json.load(f)
                if isinstance(res, dict):
                    return res
        except Exception:
            pass
    return {}

def save_class_mappings(mappings):
    try:
        with open(CLASS_MAPPINGS_FILE, 'w', encoding='utf-8') as f:
            json.dump(mappings, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[!] שגיאה בשמירת class_mappings.json: {e}")

def load_apartment_mappings():
    if os.path.exists(APARTMENT_MAPPINGS_FILE):
        try:
            with open(APARTMENT_MAPPINGS_FILE, 'r', encoding='utf-8') as f:
                res = json.load(f)
                if isinstance(res, dict):
                    return res
        except Exception:
            pass
    return {}

def save_apartment_mappings(mappings):
    try:
        with open(APARTMENT_MAPPINGS_FILE, 'w', encoding='utf-8') as f:
            json.dump(mappings, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[!] שגיאה בשמירת apartment_mappings.json: {e}")

def col_ref_to_index(cell_ref):
    col_str = ''
    for ch in (cell_ref or ''):
        if ch.isalpha():
            col_str += ch.upper()
        else:
            break
    idx = 0
    for ch in col_str:
        idx = idx * 26 + (ord(ch) - ord('A') + 1)
    return max(0, idx - 1)

def load_apartments_from_file():
    if not os.path.exists(APARTMENTS_FILE):
        return []
    
    out_json = os.path.join(BASE_DIR, 'apartments_data.json')
    # 1. Check if file is an XLSX/ZIP archive
    try:
        with open(APARTMENTS_FILE, 'rb') as f:
            header_bytes = f.read(4)
        if header_bytes.startswith(b'PK'):
            import zipfile
            import xml.etree.ElementTree as ET
            with zipfile.ZipFile(APARTMENTS_FILE, 'r') as z:
                shared_strings = []
                if 'xl/sharedStrings.xml' in z.namelist():
                    tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
                    for si in tree.findall('.//{*}si'):
                        texts = [t.text for t in si.findall('.//{*}t') if t.text]
                        shared_strings.append(''.join(texts))

                sheet_name = None
                for name in z.namelist():
                    if name.startswith('xl/worksheets/sheet') and name.endswith('.xml'):
                        sheet_name = name
                        break
                
                if sheet_name:
                    tree = ET.fromstring(z.read(sheet_name))
                    rows = []
                    for row in tree.findall('.//{*}row'):
                        row_cells = []
                        for c in row.findall('.//{*}c'):
                            ref = c.get('r', '')
                            target_col = col_ref_to_index(ref)
                            while len(row_cells) < target_col:
                                row_cells.append('')
                            t_attr = c.get('t', '')
                            v_tag = c.find('.//{*}v')
                            val = v_tag.text if v_tag is not None else ''
                            if t_attr == 's' and val.isdigit():
                                idx = int(val)
                                if idx < len(shared_strings):
                                    val = shared_strings[idx]
                            elif t_attr == 'inlineStr':
                                is_t = c.find('.//{*}t')
                                val = is_t.text if is_t is not None else ''
                            row_cells.append((val or '').strip())
                        if any(row_cells):
                            rows.append(row_cells)
                    if rows:
                        try:
                            with open(out_json, 'w', encoding='utf-8') as fj:
                                json.dump(rows, fj, ensure_ascii=False, indent=2)
                        except Exception:
                            pass
                        return rows
    except Exception as e:
        print(f"[!] שגיאה בפענוח דירות כ-XLSX: {e}")

    # 2. Fallback: Parse as standard CSV text
    import csv
    encodings = ['utf-8-sig', 'utf-8', 'cp1255', 'iso-8859-8']
    for enc in encodings:
        try:
            with open(APARTMENTS_FILE, 'r', encoding=enc) as f:
                reader = csv.reader(f)
                rows = [row for row in reader if any(row)]
                if rows:
                    try:
                        with open(out_json, 'w', encoding='utf-8') as fj:
                            json.dump(rows, fj, ensure_ascii=False, indent=2)
                    except Exception:
                        pass
                    return rows
        except Exception:
            continue
    return []

def load_data():
    out_apt = os.path.join(BASE_DIR, 'apartments_data.json')
    if not os.path.exists(out_apt):
        try:
            load_apartments_from_file()
        except Exception:
            pass

    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                d = json.load(f)
                d['targets'] = load_targets()
                d['rabbis'] = load_rabbis()
                d['classMappings'] = load_class_mappings()
                d['apartmentMappings'] = load_apartment_mappings()
                return d
        except Exception:
            pass
    d = dict(DEFAULT_DATA)
    d['targets'] = load_targets()
    d['rabbis'] = load_rabbis()
    d['classMappings'] = load_class_mappings()
    d['apartmentMappings'] = load_apartment_mappings()
    return d

def save_data(data):
    data['targets'] = load_targets()
    data['rabbis'] = load_rabbis()
    data['classMappings'] = load_class_mappings()
    data['apartmentMappings'] = load_apartment_mappings()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "campaign_url": "https://sms-admin.talphotos.win/admin/campaigns/15",
        "cookie": ""
    }

def save_config(config):
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def try_extract_browser_cookie():
    """
    Attempts to automatically extract the latest CF_Authorization cookie
    from Chrome, Edge, or Brave SQLite cookie stores on Windows.
    """
    try:
        import base64
        import sqlite3
        import shutil
        import tempfile
        import ctypes
        from ctypes import wintypes

        class DATA_BLOB(ctypes.Structure):
            _fields_ = [("cbData", wintypes.DWORD), ("pbData", ctypes.POINTER(ctypes.c_char))]

        def dpapi_decrypt(encrypted_bytes):
            try:
                blob_in = DATA_BLOB(len(encrypted_bytes), ctypes.create_string_buffer(encrypted_bytes))
                blob_out = DATA_BLOB()
                if ctypes.windll.crypt32.CryptUnprotectData(ctypes.byref(blob_in), None, None, None, None, 0, ctypes.byref(blob_out)):
                    data = ctypes.string_at(blob_out.pbData, blob_out.cbData)
                    ctypes.windll.kernel32.LocalFree(blob_out.pbData)
                    return data
            except Exception:
                pass
            return None

        class BCRYPT_AUTHENTICATED_CIPHER_MODE_INFO(ctypes.Structure):
            _fields_ = [
                ("cbSize", wintypes.ULONG),
                ("dwInfoVersion", wintypes.ULONG),
                ("pbNonce", ctypes.c_void_p),
                ("cbNonce", wintypes.ULONG),
                ("pbAuthData", ctypes.c_void_p),
                ("cbAuthData", wintypes.ULONG),
                ("pbTag", ctypes.c_void_p),
                ("cbTag", wintypes.ULONG),
                ("pbMacContext", ctypes.c_void_p),
                ("cbMacContext", wintypes.ULONG),
                ("cbAAD", wintypes.ULONG),
                ("cbData", ctypes.c_ulonglong),
                ("dwFlags", wintypes.ULONG),
            ]

        def decrypt_aes_gcm_bcrypt(key_bytes, nonce_bytes, ciphertext_bytes, tag_bytes):
            try:
                bcrypt = ctypes.windll.bcrypt
                hAlg = wintypes.HANDLE()
                if bcrypt.BCryptOpenAlgorithmProvider(ctypes.byref(hAlg), ctypes.c_wchar_p("AES"), None, 0) != 0:
                    return None
                try:
                    mode = "ChainingModeGCM"
                    mode_buf = mode.encode('utf-16le') + b'\x00\x00'
                    if bcrypt.BCryptSetProperty(hAlg, ctypes.c_wchar_p("ChainingMode"), mode_buf, len(mode_buf), 0) != 0:
                        return None
                    hKey = wintypes.HANDLE()
                    if bcrypt.BCryptGenerateSymmetricKey(hAlg, ctypes.byref(hKey), None, 0, key_bytes, len(key_bytes), 0) != 0:
                        return None
                    try:
                        info = BCRYPT_AUTHENTICATED_CIPHER_MODE_INFO()
                        info.cbSize = ctypes.sizeof(BCRYPT_AUTHENTICATED_CIPHER_MODE_INFO)
                        info.dwInfoVersion = 1
                        info.pbNonce = ctypes.cast(ctypes.c_char_p(nonce_bytes), ctypes.c_void_p)
                        info.cbNonce = len(nonce_bytes)
                        info.pbTag = ctypes.cast(ctypes.c_char_p(tag_bytes), ctypes.c_void_p)
                        info.cbTag = len(tag_bytes)

                        out_buf = ctypes.create_string_buffer(len(ciphertext_bytes))
                        cbResult = wintypes.ULONG(0)
                        status = bcrypt.BCryptDecrypt(hKey, ciphertext_bytes, len(ciphertext_bytes), ctypes.byref(info), None, 0, out_buf, len(ciphertext_bytes), ctypes.byref(cbResult), 0)
                        if status == 0:
                            return out_buf.raw[:cbResult.value]
                    finally:
                        bcrypt.BCryptDestroyKey(hKey)
                finally:
                    bcrypt.BCryptCloseAlgorithmProvider(hAlg, 0)
            except Exception:
                pass
            return None

        def decrypt_chrome_cookie(key, val):
            if not val or len(val) < 31:
                return None
            iv = val[3:15]
            ciphertext = val[15:-16]
            tag = val[-16:]
            try:
                # pyrefly: ignore [missing-import]
                from cryptography.hazmat.primitives.ciphers.aead import AESGCM
                return AESGCM(key).decrypt(iv, val[15:], None).decode('utf-8', errors='ignore')
            except Exception:
                pass
            # Fall back to Windows built-in bcrypt.dll
            dec = decrypt_aes_gcm_bcrypt(key, iv, ciphertext, tag)
            if dec:
                return dec.decode('utf-8', errors='ignore')
            return None

        browser_dirs = [
            os.path.expandvars(r'%LOCALAPPDATA%\Google\Chrome\User Data'),
            os.path.expandvars(r'%LOCALAPPDATA%\Microsoft\Edge\User Data'),
            os.path.expandvars(r'%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data')
        ]

        for bdir in browser_dirs:
            if not os.path.exists(bdir):
                continue
            local_state_path = os.path.join(bdir, 'Local State')
            aes_key = None
            if os.path.exists(local_state_path):
                try:
                    with open(local_state_path, 'r', encoding='utf-8') as f:
                        ls = json.load(f)
                    enc_key = base64.b64decode(ls['os_crypt']['encrypted_key'])
                    if enc_key.startswith(b'DPAPI'):
                        aes_key = dpapi_decrypt(enc_key[5:])
                except Exception:
                    pass

            profiles = ['Default'] + [f'Profile {i}' for i in range(1, 10)]
            for prof in profiles:
                cookie_db = os.path.join(bdir, prof, 'Network', 'Cookies')
                if not os.path.exists(cookie_db):
                    cookie_db = os.path.join(bdir, prof, 'Cookies')
                if not os.path.exists(cookie_db):
                    continue

                tmp_dir = tempfile.mkdtemp()
                tmp_db = os.path.join(tmp_dir, 'cookies.db')
                try:
                    shutil.copy2(cookie_db, tmp_db)
                    conn = sqlite3.connect(tmp_db)
                    cur = conn.cursor()
                    cur.execute("SELECT name, value, encrypted_value FROM cookies WHERE host_key LIKE '%talphotos%' AND name = 'CF_Authorization'")
                    rows = cur.fetchall()
                    conn.close()

                    for name, plain_val, enc_val in rows:
                        cookie_token = None
                        if plain_val:
                            cookie_token = plain_val
                        elif enc_val and aes_key:
                            cookie_token = decrypt_chrome_cookie(aes_key, enc_val)
                        elif enc_val and not enc_val.startswith(b'v10') and not enc_val.startswith(b'v11'):
                            raw_dec = dpapi_decrypt(enc_val)
                            if raw_dec:
                                cookie_token = raw_dec.decode('utf-8', errors='ignore')

                        if cookie_token and len(cookie_token) > 50:
                            print(f"[+] נמצא טוקן CF_Authorization אוטומטית מתוך הדפדפן ({os.path.basename(bdir)} - {prof})!")
                            cfg = load_config()
                            cfg['cookie'] = cookie_token
                            save_config(cfg)
                            return cookie_token
                except Exception:
                    pass
                finally:
                    try:
                        shutil.rmtree(tmp_dir, ignore_errors=True)
                    except Exception:
                        pass
    except Exception as e:
        print(f"[!] שגיאה בניסיון שליפת קוקי אוטומטית: {e}")
    return None

def log_sync(msg):
    try:
        from datetime import datetime
        with open(os.path.join(BASE_DIR, 'sync_log.txt'), 'a', encoding='utf-8') as f:
            f.write(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}\n")
    except Exception:
        pass

def fetch_url(url, cookie, retries=1):
    log_sync(f"fetch_url: {url} (cookie len={len(cookie)})")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Cookie": cookie,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive"
    })
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=25) as response:
                final_url = response.geturl()
                if 'cloudflareaccess.com' in final_url or '/login' in final_url:
                    log_sync(f"REDIRECT TO CF: {final_url}")
                    print(f"[!] הפניה ל-Cloudflare Access עבור {url} - הטוקן פג תוקף.")
                    try:
                        d = load_data()
                        d['syncStatus'] = 'expired_cookie'
                        save_data(d)
                    except Exception:
                        pass
                    return None
                html = response.read().decode('utf-8', errors='ignore')
                if 'cloudflareaccess.com' in html and '<title>Access' in html:
                    log_sync(f"CF AUTH PAGE DETECTED for {url}")
                    print(f"[!] דף אימות של Cloudflare זוהה - הטוקן פג תוקף.")
                    try:
                        d = load_data()
                        d['syncStatus'] = 'expired_cookie'
                        save_data(d)
                    except Exception:
                        pass
                    return None
                log_sync(f"SUCCESS {url}: length={len(html)}, has_tomech={'תומך' in html}")
                return html
        except Exception as e:
            if attempt < retries:
                time.sleep(1.0)
                continue
            log_sync(f"ERROR {url}: {e}")
            print(f"[!] שגיאת תקשורת מול {url}: {e}")
            return None

def parse_overview_metrics(html_text, data):
    try:
        # 1. Exact extraction from admin .stat cards: <div class="stat"><div class="label">...</div><div class="value">...</div></div>
        m_agents = re.search(r'<div class="label">נציגים</div>\s*<div class="value">(\d+)</div>', html_text) or \
                   re.search(r'stat">\s*<div[^>]*>נציגים</div>\s*<div[^>]*>(\d+)</div>', html_text)
        if m_agents:
            data['metrics']['agentsCount'] = int(m_agents.group(1))

        m_active = re.search(r'<div class="label">פעלו בחצי השעה האחרונה</div>\s*<div class="value">(\d+)</div>', html_text) or \
                   re.search(r'stat">\s*<div[^>]*>פעלו בחצי השעה האחרונה</div>\s*<div[^>]*>(\d+)</div>', html_text)
        if m_active:
            data['metrics']['activeRecently'] = int(m_active.group(1))
            data['metrics']['activeAgentsCount'] = int(m_active.group(1))

        m_today = re.search(r'<div class="label">שיחות היום</div>\s*<div class="value">(\d+)</div>', html_text) or \
                  re.search(r'stat">\s*<div[^>]*>שיחות היום</div>\s*<div[^>]*>(\d+)</div>', html_text)
        if m_today:
            data['metrics']['callsToday'] = int(m_today.group(1))

        m_total = re.search(r'<div class="label">שיחות מתחילת הקמפיין</div>\s*<div class="value">(\d+)</div>', html_text) or \
                  re.search(r'stat">\s*<div[^>]*>שיחות מתחילת הקמפיין</div>\s*<div[^>]*>(\d+)</div>', html_text)
        if m_total:
            data['metrics']['callsTotal'] = int(m_total.group(1))

        # Strip all HTML tags to pure text for fallback overview cards matching
        text_clean = re.sub(r'<[^>]+>', ' ', html_text)
        text_clean = re.sub(r'\s+', ' ', text_clean)

        if not m_agents:
            agents_match = re.search(r'נציגים[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}נציגים', text_clean)
            if agents_match:
                data['metrics']['agentsCount'] = int(agents_match.group(1))

        if not m_active:
            active_match = re.search(r'פעלו בחצי השעה האחרונה[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}פעלו בחצי השעה האחרונה', text_clean)
            if active_match:
                data['metrics']['activeRecently'] = int(active_match.group(1))
                data['metrics']['activeAgentsCount'] = int(active_match.group(1))

        if not m_today:
            today_match = re.search(r'שיחות היום[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}שיחות היום', text_clean)
            if today_match:
                data['metrics']['callsToday'] = int(today_match.group(1))

        if not m_total:
            total_match = re.search(r'שיחות מתחילת הקמפיין[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}שיחות מתחילת הקמפיין', text_clean)
            if total_match:
                data['metrics']['callsTotal'] = int(total_match.group(1))

        # Total Contacts / Leads
        leads_total_match = re.search(r'מוצגים[^\d]{1,50}\d+[-עעד]\d+[^\d]{1,50}מתוך[^\d]{1,50}([\d,]+)', text_clean) or \
                            re.search(r'מתוך\s*([\d,]+)\s*אנשי\s*קשר', text_clean) or \
                            re.search(r'([\d,]+)\s*אנשי\s*קשר', text_clean)
        if leads_total_match:
            data['leadsTotal'] = int(leads_total_match.group(1).replace(',', ''))

        found_cards = False

        # 1. Exact extraction from HTML table.results (official campaign overview table)
        table_match = re.search(r'<table[^>]*class=["\'][^"\']*results[^"\']*["\'][^>]*>(.*?)</table>', html_text, re.DOTALL)
        if table_match:
            rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table_match.group(1), re.DOTALL)
            results_dict = {}
            for row in rows:
                cols = re.findall(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
                if len(cols) >= 3:
                    name = re.sub(r'<[^>]+>', '', cols[0]).strip()
                    total_str = re.sub(r'<[^>]+>', '', cols[2]).strip()
                    m_num = re.search(r'\d+', total_str.replace(',', ''))
                    if m_num:
                        results_dict[name] = int(m_num.group(0))

            if results_dict:
                supp = results_dict.get('תומך', 0) + results_dict.get('תומך ורוצה לעזור', 0)
                thresh = results_dict.get('תומך אחוז חסימה', 0)
                hesitant = results_dict.get('מתלבט', 0)
                not_supp = results_dict.get('לא תומך', 0)
                no_ans = (results_dict.get('אין מענה', 0) +
                          results_dict.get('מספר שגוי', 0) +
                          results_dict.get('לחזור', 0) +
                          results_dict.get('לחזור עוד שבוע', 0) +
                          results_dict.get('טופל במערכת אחרת (שם קודם)', 0) +
                          results_dict.get('טופל בקמפיין אחר (שם קודם)', 0))
                total_rep = supp + thresh + hesitant + not_supp + no_ans
                if total_rep > 0:
                    data['overviewResults'] = {
                        'supporters': supp,
                        'supportersPct': round((supp / total_rep) * 100),
                        'threshold': thresh,
                        'thresholdPct': round((thresh / total_rep) * 100),
                        'hesitant': hesitant,
                        'hesitantPct': round((hesitant / total_rep) * 100),
                        'notSupporters': not_supp,
                        'notSupportersPct': round((not_supp / total_rep) * 100),
                        'noAnswer': no_ans,
                        'noAnswerPct': round((no_ans / total_rep) * 100),
                        'totalReported': total_rep
                    }
                    data['metrics']['supportersCount'] = supp
                    data['metrics']['thresholdCount'] = thresh
                    data['metrics']['hesitantCount'] = hesitant
                    found_cards = True
                    print(f"[+] תוצאות סקירה מ-table.results עודכנו: תומך={supp}, סף={thresh}, מתלבט={hesitant}, לא-תומך={not_supp}, אין-מענה={no_ans} מתוך {total_rep}")

        # 2. Overview cards breakdown fallback (supports both: label...number OR number...label)
        if not found_cards:
            thresh_match = re.search(r'אחוז\s*חסימה[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}אחוז\s*חסימה', text_clean)
            supp_match = re.search(r'תומך(?!\s*אחוז)[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}תומך(?!\s*אחוז)', text_clean)
            hesitant_match = re.search(r'מתלבט[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}מתלבט', text_clean)
            not_supp_match = re.search(r'לא\s*תומך[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}לא\s*תומך', text_clean)
            no_ans_match = re.search(r'אין\s*מענה[^\d]{1,60}(\d+)', text_clean) or re.search(r'(\d+)[^\d]{1,60}אין\s*מענה', text_clean)
            rep_match = re.search(r'מתוך\s*([\d,]+)\s*מדווחים', text_clean) or re.search(r'([\d,]+)\s*מדווחים', text_clean)

            if supp_match and (not_supp_match or thresh_match or hesitant_match or no_ans_match):
                supp = int(supp_match.group(1))
                thresh = int(thresh_match.group(1)) if thresh_match else 0
                hesitant = int(hesitant_match.group(1)) if hesitant_match else 0
                not_supp = int(not_supp_match.group(1)) if not_supp_match else 0
                no_ans = int(no_ans_match.group(1)) if no_ans_match else 0
                total_rep = int(rep_match.group(1).replace(',', '')) if rep_match else (supp + thresh + hesitant + not_supp + no_ans)

                if total_rep > 0:
                    data['overviewResults'] = {
                        'supporters': supp,
                        'supportersPct': round((supp / total_rep) * 100),
                        'threshold': thresh,
                        'thresholdPct': round((thresh / total_rep) * 100),
                        'hesitant': hesitant,
                        'hesitantPct': round((hesitant / total_rep) * 100),
                        'notSupporters': not_supp,
                        'notSupportersPct': round((not_supp / total_rep) * 100),
                        'noAnswer': no_ans,
                        'noAnswerPct': round((no_ans / total_rep) * 100),
                        'totalReported': total_rep
                    }
                    data['metrics']['supportersCount'] = supp
                    data['metrics']['thresholdCount'] = thresh
                    data['metrics']['hesitantCount'] = hesitant
                    found_cards = True
                    print(f"[+] תוצאות סקירה עודכנו אוטומטית: תומך={supp}, סף={thresh}, מתלבט={hesitant}, לא-תומך={not_supp}, אין-מענה={no_ans} מתוך {total_rep}")

        # Fallback: only compute from scraped leads if we don't already have an official overview count
        existing_rep = (data.get('overviewResults') or {}).get('totalReported', 0)
        if not found_cards and data.get('leads') and len(data['leads']) > existing_rep:
            leads = data['leads']
            supp = sum(1 for l in leads if 'תומך' in l.get('result', '') and 'לא' not in l.get('result', '') and 'אחוז' not in l.get('result', ''))
            thresh = sum(1 for l in leads if 'אחוז חסימה' in l.get('result', ''))
            hesitant = sum(1 for l in leads if 'מתלבט' in l.get('result', ''))
            not_supp = sum(1 for l in leads if 'לא תומך' in l.get('result', ''))
            no_ans = sum(1 for l in leads if 'אין מענה' in l.get('result', ''))
            total_rep = supp + thresh + hesitant + not_supp + no_ans
            if total_rep > 0:
                data['overviewResults'] = {
                    'supporters': supp,
                    'supportersPct': round((supp / total_rep) * 100),
                    'threshold': thresh,
                    'thresholdPct': round((thresh / total_rep) * 100),
                    'hesitant': hesitant,
                    'hesitantPct': round((hesitant / total_rep) * 100),
                    'notSupporters': not_supp,
                    'notSupportersPct': round((not_supp / total_rep) * 100),
                    'noAnswer': no_ans,
                    'noAnswerPct': round((no_ans / total_rep) * 100),
                    'totalReported': total_rep
                }
                data['metrics']['supportersCount'] = supp
                data['metrics']['thresholdCount'] = thresh
                data['metrics']['hesitantCount'] = hesitant
                print(f"[+] תוצאות סקירה חושבו אוטומטית מתוך הלידים: תומך={supp}, סף={thresh}, מתלבט={hesitant}, לא-תומך={not_supp}, אין-מענה={no_ans} מתוך {total_rep}")
    except Exception as e:
        print(f"[!] שגיאה ב-parse_overview_metrics: {e}")
        pass
        pass

def parse_agents_tab(html_input, data):
    try:
        html_list = html_input if isinstance(html_input, list) else [html_input]
        new_agents = []
        seen_keys = set()
        agent_idx = 1

        for html_text in html_list:
            if not html_text:
                continue
            tr_matches = re.findall(r'<tr[^>]*>(.*?)</tr>', html_text, re.DOTALL | re.IGNORECASE)
            for tr in tr_matches:
                td_matches = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL | re.IGNORECASE)
                if not td_matches or len(td_matches) < 2:
                    continue
                cols = [re.sub(r'<[^>]+>', ' ', td).strip() for td in td_matches]
                cols = [re.sub(r'\s+', ' ', c) for c in cols]

                name_col = cols[0]
                if not name_col or name_col == 'נציג' or 'מיון' in name_col:
                    continue

                phone_col = ""
                for c in cols[1:3]:
                    m = re.search(r'05\d-?\d{7}|\d{9,10}', c)
                    if m:
                        phone_col = m.group(0)
                        break
                if not phone_col and len(cols) > 1 and re.search(r'\d{7,10}', cols[1]):
                    phone_col = re.search(r'\d{7,10}', cols[1]).group(0)

                key = phone_col if phone_col else name_col
                if key in seen_keys:
                    continue
                seen_keys.add(key)

                group_val = cols[2] if len(cols) > 2 else "מדברה כעדן"
                account_val = cols[3] if len(cols) > 3 else "נוצר"
                raw_status = cols[4] if len(cols) > 4 else "עובד בקמפיין"

                # Accurate status format
                status_type = "former" if ("לשעבר" in raw_status or "יצא" in raw_status or "עזב" in raw_status) else "active"
                status_val = raw_status
                if "לשעבר" in raw_status:
                    if "יצא" in raw_status:
                        parts = raw_status.split("יצא")
                        status_val = f"חבר לשעבר (יצא {parts[1].strip()})" if len(parts) > 1 else raw_status
                    else:
                        status_val = "חבר לשעבר"
                elif not status_val or status_val == "—":
                    status_val = "עובד בקמפיין"

                def parse_int(val, default=0):
                    m = re.search(r'\d+', val)
                    return int(m.group(0)) if m else default

                # Open lead: col 5 has either lead name or empty
                has_open_lead = 1 if (len(cols) > 5 and cols[5] and cols[5] != '—' and cols[5] != '-') else 0

                new_agents.append({
                    "id": agent_idx,
                    "name": name_col,
                    "phone": phone_col,
                    "group": group_val,
                    "account": account_val,
                    "status": status_val,
                    "statusType": status_type,
                    "leads_open": has_open_lead,
                    "leads_today": parse_int(cols[6]) if len(cols) > 6 else 0,
                    "reports_count": parse_int(cols[7]) if len(cols) > 7 else 0,
                    "avg_time": cols[8] if len(cols) > 8 and cols[8] else "—",
                    "fixes": parse_int(cols[11]) if len(cols) > 11 else 0,
                    "released": parse_int(cols[12]) if len(cols) > 12 else 0,
                    "skips": parse_int(cols[13]) if len(cols) > 13 else 0
                })
                agent_idx += 1

        if new_agents:
            data['agents'] = new_agents
            data['metrics']['agentsCount'] = len(new_agents)
            data['metrics']['activeAgentsCount'] = len([a for a in new_agents if a.get('statusType') == 'active' and 'לשעבר' not in a.get('status', '')])
            print(f"[+] עודכנו נתוני נציגים: {len(new_agents)} נציגים נטענו בהצלחה (פעילים: {data['metrics']['activeAgentsCount']})")
    except Exception as e:
        print(f"[!] שגיאה בפענוח נציגים: {e}")
        pass

def parse_leads_tab(html_text, data, merge=True):
    try:
        tr_matches = re.findall(r'<tr[^>]*>(.*?)</tr>', html_text, re.DOTALL | re.IGNORECASE)
        new_leads = []
        lead_idx = 1
        for tr in tr_matches:
            td_matches = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL | re.IGNORECASE)
            if not td_matches:
                continue
            cols = [re.sub(r'<[^>]+>', ' ', td).strip() for td in td_matches]
            cols = [re.sub(r'\s+', ' ', c) for c in cols]

            phone = ""
            for c in cols:
                if re.search(r'05\d-?\d{7}', c) or re.search(r'\d{9,10}', c):
                    phone = c
                    break

            if phone and len(cols) >= 3:
                name = cols[0]
                status_label = cols[2] if len(cols) > 2 else "ממתין"
                result_val = cols[3] if len(cols) > 3 else "—"
                note_val = cols[4] if len(cols) > 4 else "—"
                attempts_val = cols[5] if len(cols) > 5 else "0"
                last_agent_val = cols[6] if len(cols) > 6 else "—"
                updated_val = cols[7] if len(cols) > 7 else "היום"

                new_leads.append({
                    "id": lead_idx,
                    "name": name,
                    "phone": phone,
                    "statusLabel": status_label,
                    "result": result_val,
                    "note": note_val,
                    "attempts": attempts_val,
                    "last_agent": last_agent_val,
                    "updated": updated_val
                })
                lead_idx += 1

        if new_leads:
            if merge and data.get('leads') and len(data['leads']) > 0:
                lead_dict = {l.get('phone', str(idx)): l for idx, l in enumerate(data['leads'])}
                for nl in new_leads:
                    lead_dict[nl['phone']] = nl
                merged_leads = list(lead_dict.values())
                for i, l in enumerate(merged_leads, 1):
                    l['id'] = i
                data['leads'] = merged_leads
            else:
                data['leads'] = new_leads

        # Extract leadsTotal count from pagination or total contacts text
        leads_total_match = re.search(r'מוצגים[^\d]{1,50}\d+[-עעד]\d+[^\d]{1,50}מתוך[^\d]{1,50}([\d,]+)', html_text) or \
                            re.search(r'מתוך\s*([\d,]+)\s*אנשי\s*קשר', html_text) or \
                            re.search(r'([\d,]+)\s*אנשי\s*קשר', html_text)
        if leads_total_match:
            data['leadsTotal'] = int(leads_total_match.group(1).replace(',', ''))
        return len(new_leads)
    except Exception:
        return 0

def parse_campaign_html(html_text, tab=None):
    data = load_data()
    if tab == 'agents':
        parse_agents_tab(html_text, data)
    elif tab == 'leads':
        parse_leads_tab(html_text, data)
    elif tab == 'overview':
        parse_overview_metrics(html_text, data)
    else:
        parse_overview_metrics(html_text, data)
        parse_agents_tab(html_text, data)
        parse_leads_tab(html_text, data)
    from datetime import datetime
    data['lastSync'] = datetime.now().strftime("%H:%M:%S")
    save_data(data)
    return data, None

scrape_lock = threading.Lock()
firebase_deploy_lock = threading.Lock()
last_firebase_deploy_time = 0

def trigger_firebase_deploy_async(force=False):
    def _deploy():
        global last_firebase_deploy_time
        now = time.time()
        if not force and (now - last_firebase_deploy_time < 30):
            return
        if not firebase_deploy_lock.acquire(blocking=False):
            return
        try:
            last_firebase_deploy_time = now
            root_dir = os.path.dirname(BASE_DIR)
            import subprocess
            res = subprocess.run("firebase deploy --only hosting", cwd=root_dir, shell=True, capture_output=True, text=True)
            if res.returncode == 0:
                log_sync("Auto-deployed updated files to Firebase Hosting successfully")
                print(" * סונכרן והועלה אוטומטית ל-Firebase Hosting בהצלחה!")
            else:
                err_msg = (res.stderr or res.stdout or '')[:200]
                log_sync(f"Auto-deploy failed: {err_msg}")
                print(f"[!] העלאה אוטומטית לפיירבייס: {err_msg}")
        except Exception as e:
            log_sync(f"Auto-deploy to Firebase failed: {e}")
        finally:
            firebase_deploy_lock.release()
    threading.Thread(target=_deploy, daemon=True).start()

def fetch_and_scrape(full_history=False):
    # Only one scrape operation can run at a time across all threads
    if not scrape_lock.acquire(blocking=False):
        return load_data(), None
    try:
        return _do_fetch_and_scrape(full_history=full_history)
    finally:
        scrape_lock.release()

def _do_fetch_and_scrape(full_history=False):
    config = load_config()
    base_url = config.get("campaign_url", "https://sms-admin.talphotos.win/admin/campaigns/15")
    base_url = base_url.split('?')[0]
    cookie = config.get("cookie", "").strip()
    if cookie and not "=" in cookie:
        cookie = f"CF_Authorization={cookie}"

    data = load_data()
    updated_something = False

    # 1. Overview metrics & results (from ?tab=overview in admin)
    overview_url = f"{base_url}?tab=overview"
    html_overview = fetch_url(overview_url, cookie)
    if not html_overview:
        log_sync("Overview returned None - checking browser cookie auto-extraction...")
        new_token = try_extract_browser_cookie()
        if new_token:
            cookie = f"CF_Authorization={new_token}"
            cfg_temp = load_config()
            cfg_temp['cookie'] = new_token
            save_config(cfg_temp)
            html_overview = fetch_url(overview_url, cookie)

    if html_overview:
        try:
            with open(os.path.join(BASE_DIR, 'debug_overview.html'), 'w', encoding='utf-8') as f:
                f.write(html_overview)
        except Exception:
            pass
        parse_overview_metrics(html_overview, data)
        updated_something = True

    time.sleep(0.3)

    # 2. Agents tab (table of all agents, status, calls, etc. across all pages)
    all_agents_html = []
    agents_url = f"{base_url}?tab=agents"
    html_agents = fetch_url(agents_url, cookie)
    if html_agents:
        all_agents_html.append(html_agents)
        try:
            with open(os.path.join(BASE_DIR, 'debug_agents.html'), 'w', encoding='utf-8') as f:
                f.write(html_agents)
        except Exception:
            pass

        # Paginate through additional agent pages if present (page=1, page=2...)
        for page_num in range(1, 10):
            has_next = f"page={page_num}" in html_agents or f"&amp;page={page_num}" in html_agents
            if not has_next and all_agents_html:
                has_next = f"page={page_num}" in all_agents_html[-1] or f"&amp;page={page_num}" in all_agents_html[-1]
            if has_next:
                time.sleep(0.3)
                p_url = f"{base_url}?tab=agents&page={page_num}"
                p_html = fetch_url(p_url, cookie)
                if p_html and ('<tr' in p_html):
                    all_agents_html.append(p_html)
                else:
                    break
            else:
                break

        parse_agents_tab(all_agents_html, data)
        updated_something = True

    time.sleep(0.3)

    # 3. FAST LIVE LEADS: Fetch Page 1 of all recent leads (real-time stream of latest calls)
    leads_page1_url = f"{base_url}?tab=leads"
    html_leads_p1 = fetch_url(leads_page1_url, cookie)
    if html_leads_p1:
        cnt = parse_leads_tab(html_leads_p1, data, merge=True)
        if cnt > 0:
            updated_something = True

    # 4. FAST LIVE SUPPORTERS: Fetch Page 1 of supporters, threshold supporters, and hesitant
    for supp_type in ["%D7%AA%D7%95%D7%9E%D7%9A", "%D7%AA%D7%95%D7%9E%D7%9A%20%D7%90%D7%97%D7%95%D7%96%20%D7%97%D7%A1%D7%99%D7%9E%D7%94", "%D7%9E%D7%AA%D7%9C%D7%91%D7%98"]:
        time.sleep(0.3)
        supp_url = f"{base_url}?tab=leads&result={supp_type}"
        html_supp = fetch_url(supp_url, cookie)
        if html_supp:
            cnt = parse_leads_tab(html_supp, data, merge=True)
            if cnt > 0:
                updated_something = True

    from datetime import datetime
    # Save immediately right after fetching live pages!
    if updated_something:
        data['lastSync'] = datetime.now().strftime("%H:%M:%S")
        data['syncStatus'] = 'ok'
        save_data(data)
        trigger_firebase_deploy_async()

    # 5. Deep pagination only when explicitly requested (in slow background thread)
    if full_history:
        for supp_type in ["%D7%AA%D7%95%D7%9E%D7%9A", "%D7%AA%D7%95%D7%9E%D7%9A%20%D7%90%D7%97%D7%95%D7%96%20%D7%97%D7%A1%D7%99%D7%9E%D7%94", "%D7%9E%D7%AA%D7%9C%D7%91%D7%98"]:
            for p in range(2, 8):
                time.sleep(0.5)
                supp_url = f"{base_url}?tab=leads&result={supp_type}&page={p}"
                html_supp = fetch_url(supp_url, cookie)
                if html_supp:
                    cnt = parse_leads_tab(html_supp, data, merge=True)
                    if cnt == 0:
                        break
                    save_data(data)
                else:
                    break

        for p in range(2, 10):
            time.sleep(0.5)
            page_url = f"{base_url}?tab=leads&page={p}"
            html_page = fetch_url(page_url, cookie)
            if html_page:
                cnt = parse_leads_tab(html_page, data, merge=True)
                if cnt == 0:
                    break
                save_data(data)
            else:
                break

    if updated_something:
        data['lastSync'] = datetime.now().strftime("%H:%M:%S")
        data['syncStatus'] = 'ok'
        save_data(data)
        return data, None
    else:
        data['lastSync'] = datetime.now().strftime("%H:%M:%S")
        data['syncStatus'] = 'auth_failed'
        save_data(data)
        return data, "אימות נכשל מול האדמין (נדרש עדכון קוקי)"

class CampaignRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS for local network and WiFi access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/data':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            data = load_data()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
            return
        elif parsed.path == '/api/sync':
            data, error = fetch_and_scrape()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            resp = {"success": error is None, "data": data, "error": error}
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return
        elif parsed.path == '/api/proxy':
            # CORS proxy: browser sends url+cookie, server fetches and returns HTML
            params = urllib.parse.parse_qs(parsed.query)
            target_url = params.get('url', [''])[0]
            cookie_hdr = params.get('cookie', [''])[0]
            if not target_url:
                # Read from body via query params passed in headers
                cookie_hdr = self.headers.get('X-Proxy-Cookie', '')
            if target_url:
                if not cookie_hdr:
                    cfg = load_config()
                    cookie_hdr = cfg.get('cookie', '')
                    if cookie_hdr and '=' not in cookie_hdr:
                        cookie_hdr = f'CF_Authorization={cookie_hdr}'
                html = fetch_url(target_url, cookie_hdr)
                if html:
                    self.send_response(200)
                    self.send_header('Content-Type', 'text/html; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(html.encode('utf-8'))
                else:
                    self.send_response(502)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Failed to fetch URL'}).encode('utf-8'))
            else:
                self.send_response(400)
                self.end_headers()
            return
        elif parsed.path == '/api/config':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            config = load_config()
            self.wfile.write(json.dumps(config, ensure_ascii=False).encode('utf-8'))
            return
        elif parsed.path == '/api/students':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            students = load_students_from_csv()
            self.wfile.write(json.dumps(students, ensure_ascii=False).encode('utf-8'))
            return
        elif parsed.path == '/api/class-mappings':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            mappings = load_class_mappings()
            self.wfile.write(json.dumps(mappings, ensure_ascii=False).encode('utf-8'))
            return
        elif parsed.path == '/api/apartments':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            raw_rows = load_apartments_from_file()
            mappings = load_apartment_mappings()
            resp = {
                "rows": raw_rows,
                "mappings": mappings
            }
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return
        # Normalize self.path to relative path so other devices requesting absolute URLs don't get 404
        self.path = '/index.html' if (parsed.path == '/' or parsed.path == '') else parsed.path
        if parsed.query:
            self.path += '?' + parsed.query

        try:
            return super().do_GET()
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length) if length > 0 else b''

        if parsed.path == '/api/sync':
            data, error = fetch_and_scrape()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            resp = {"success": error is None, "data": data, "error": error}
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return

        elif parsed.path == '/api/class-mappings':
            try:
                payload = json.loads(body.decode('utf-8'))
                mappings = load_class_mappings()
                mappings.update(payload)
                save_class_mappings(mappings)
                data = load_data()
                save_data(data)
                trigger_firebase_deploy_async(force=True)
                resp = {"success": True, "classMappings": mappings}
            except Exception as e:
                resp = {"success": False, "error": str(e)}
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return

        elif parsed.path == '/api/apartments':
            try:
                payload = json.loads(body.decode('utf-8'))
                mappings = load_apartment_mappings()
                incoming = payload.get('mappings', payload)
                if isinstance(incoming, dict):
                    mappings.update(incoming)
                save_apartment_mappings(mappings)
                data = load_data()
                save_data(data)
                trigger_firebase_deploy_async(force=True)
                resp = {"success": True, "mappings": mappings}
            except Exception as e:
                resp = {"success": False, "error": str(e)}
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return

        elif parsed.path == '/api/update':
            try:
                payload = json.loads(body.decode('utf-8'))
                tab = payload.get('tab', None)  # 'overview', 'agents', 'leads', or None
                if 'html' in payload:
                    data, err = parse_campaign_html(payload['html'], tab)
                    resp = {"success": True, "data": data, "tab": tab, "agentsCount": len(data.get('agents', []))}
                elif 'targets' in payload:
                    save_targets(payload['targets'])
                    data = load_data()
                    save_data(data)
                    trigger_firebase_deploy_async(force=True)
                    resp = {"success": True, "targets": payload['targets']}
                elif 'rabbis' in payload:
                    save_rabbis(payload['rabbis'])
                    data = load_data()
                    save_data(data)
                    trigger_firebase_deploy_async(force=True)
                    resp = {"success": True, "rabbis": payload['rabbis']}
                elif 'classMappings' in payload:
                    mappings = load_class_mappings()
                    mappings.update(payload['classMappings'])
                    save_class_mappings(mappings)
                    data = load_data()
                    save_data(data)
                    trigger_firebase_deploy_async(force=True)
                    resp = {"success": True, "classMappings": mappings}
                elif 'apartmentMappings' in payload:
                    mappings = load_apartment_mappings()
                    mappings.update(payload['apartmentMappings'])
                    save_apartment_mappings(mappings)
                    data = load_data()
                    save_data(data)
                    trigger_firebase_deploy_async(force=True)
                    resp = {"success": True, "apartmentMappings": mappings}
                elif 'adminPassword' in payload:
                    targets = load_targets()
                    targets['adminPassword'] = payload['adminPassword']
                    save_targets(targets)
                    data = load_data()
                    save_data(data)
                    trigger_firebase_deploy_async(force=True)
                    resp = {"success": True, "adminPassword": payload['adminPassword']}
                elif 'data' in payload:
                    data = load_data()
                    incoming = payload['data']
                    if isinstance(incoming, dict):
                        # CRITICAL: DO NOT touch targets here! Targets are strictly managed via targets.json
                        if incoming.get('overviewResults'):
                            data['overviewResults'] = incoming['overviewResults']
                        if incoming.get('metrics'):
                            data['metrics'].update(incoming['metrics'])
                    save_data(data)
                    resp = {"success": True, "data": data}
                else:
                    resp = {"success": False, "error": "פורמט לא תקין"}
            except Exception as e:
                import traceback
                resp = {"success": False, "error": str(e), "trace": traceback.format_exc()}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return

        elif parsed.path == '/api/config':
            try:
                new_conf = json.loads(body.decode('utf-8'))
                save_config(new_conf)
                resp = {"success": True}
            except Exception as e:
                resp = {"success": False, "error": str(e)}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

def run_server():
    try:
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

    local_ip = get_local_ip()
    print("=" * 60)
    print("      חמ״ל נעם לישראל - שרת מקומי וסנכרון לידים פעיל")
    print("=" * 60)
    print(f" * פתיחה במחשב זה:                http://localhost:{PORT}")
    print(f" * פתיחה מכל מחשב/סמארטפון ב-WiFi: http://{local_ip}:{PORT}")
    print("=" * 60)
    print(" לסגירת השרת: סגור חלון זה או לחץ Ctrl+C\n")

    # Try automatic cookie extraction from local browser at launch
    try:
        ext_cookie = try_extract_browser_cookie()
        if ext_cookie:
            print(" * נמצא וחולץ אוטומטית טוקן Cloudflare מהדפדפן!")
    except Exception as e:
        pass

    # Save initial default data
    if not os.path.exists(DATA_FILE):
        save_data(DEFAULT_DATA)

    def background_worker():
        while True:
            try:
                fetch_and_scrape(full_history=False)
            except Exception:
                pass
            time.sleep(10)

    def deep_worker():
        time.sleep(20)  # Wait 20 seconds after launch
        while True:
            try:
                fetch_and_scrape(full_history=True)
            except Exception:
                pass
            time.sleep(600)  # Full archive crawl every 10 minutes

    # Initial fast sync on launch
    threading.Thread(target=lambda: fetch_and_scrape(full_history=False), daemon=True).start()
    # Continuous background worker every 10 seconds
    threading.Thread(target=background_worker, daemon=True).start()
    # Deep archive sync in background
    threading.Thread(target=deep_worker, daemon=True).start()
    print(" * סנכרון רקע אוטומטי מופעל (מתעדכן כל 10 שניות מול חלוקת הלידים)\n")

    # Automatically open default browser after short delay
    def open_browser():
        time.sleep(0.8)
        try:
            import webbrowser
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass
    threading.Thread(target=open_browser, daemon=True).start()

    # Allow dual-stack IPv4/IPv6 listening
    class ReusableTCPServer(socketserver.TCPServer):
        allow_reuse_address = True

    with ReusableTCPServer(("0.0.0.0", PORT), CampaignRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nהשרת נעצר.")

if __name__ == '__main__':
    run_server()
