#!/usr/bin/env bash
set -e

KEYSTORE_FILE="release.keystore"
ALIAS="com_serkanadak_gezgingunlugu_key"

if [ -f "$KEYSTORE_FILE" ]; then
  echo "Keystore zaten mevcut: $KEYSTORE_FILE"
  exit 0
fi

echo "Yeni Google Play Release Keystore oluşturuluyor..."
keytool -genkey -v -keystore "$KEYSTORE_FILE" -alias "$ALIAS" -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Gezgin Günlüğü, OU=Mobile, O=Serkan Adak, L=Istanbul, ST=Istanbul, C=TR" -storepass "ReleasePass2026!" -keypass "ReleasePass2026!"

echo "Keystore başarıyla oluşturuldu: $KEYSTORE_FILE (Alias: $ALIAS)"
