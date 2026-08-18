import gspread
from oauth2client.service_account import ServiceAccountCredentials
import csv
import os

# Path to the service account credentials JSON file
# You MUST download this from Google Cloud Console and place it in the project root
CREDENTIALS_FILE = 'google-credentials.json'

# Name of your Google Sheet
# The service account email MUST be shared on this Google Sheet with Editor access
SPREADSHEET_NAME = 'Data Exfiltration Dashboard Live Data'

LOGS_DIR = os.path.join(os.path.dirname(__file__), '..', 'logs')

def get_google_sheets_client():
    if not os.path.exists(CREDENTIALS_FILE):
        print(f"Error: {CREDENTIALS_FILE} not found.")
        print("Please obtain a service account JSON file from Google Cloud Console and save it as 'google-credentials.json'.")
        return None

    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']
    
    creds = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, scope)
    client = gspread.authorize(creds)
    return client

def sync_csv_to_worksheet(client, spreadsheet, csv_filename, worksheet_name):
    csv_path = os.path.join(LOGS_DIR, csv_filename)
    if not os.path.exists(csv_path):
        print(f"Warning: {csv_filename} not found in logs directory. Skipping.")
        return

    try:
        # Try to open worksheet, if not exists create it
        try:
            worksheet = spreadsheet.worksheet(worksheet_name)
        except gspread.exceptions.WorksheetNotFound:
            worksheet = spreadsheet.add_worksheet(title=worksheet_name, rows="100", cols="20")

        # Read CSV data
        with open(csv_path, 'r') as f:
            reader = csv.reader(f)
            data = list(reader)

        if data:
            # Clear existing data and update
            worksheet.clear()
            worksheet.update(data, 'A1')
            print(f"Successfully synced {csv_filename} to worksheet '{worksheet_name}'.")
        else:
            print(f"CSV file {csv_filename} is empty. Skipping.")

    except Exception as e:
        print(f"Failed to sync {csv_filename}: {e}")

def main():
    client = get_google_sheets_client()
    if not client:
        return

    try:
        spreadsheet = client.open(SPREADSHEET_NAME)
    except gspread.exceptions.SpreadsheetNotFound:
        print(f"Error: Spreadsheet '{SPREADSHEET_NAME}' not found.")
        print(f"Make sure you created a Google Sheet named '{SPREADSHEET_NAME}' and shared it with the service account email.")
        return

    print(f"Syncing logs to Google Sheet '{SPREADSHEET_NAME}'...")
    
    # Sync core logs
    sync_csv_to_worksheet(client, spreadsheet, 'alerts.csv', 'Alerts')
    sync_csv_to_worksheet(client, spreadsheet, 'access_logs.csv', 'Access Logs')
    sync_csv_to_worksheet(client, spreadsheet, 'exports.csv', 'Exports')
    
    print("Sync complete.")

if __name__ == "__main__":
    main()
