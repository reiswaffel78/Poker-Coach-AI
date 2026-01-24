# Poker Coach Chrome Extension

KI-gestützter Poker-Trainingsassistent als Browser-Erweiterung.

## Installation

### Schritt 1: Extension in Chrome laden

1. Öffne Chrome und gehe zu `chrome://extensions/`
2. Aktiviere oben rechts den **Entwicklermodus**
3. Klicke auf **Entpackte Erweiterung laden**
4. Wähle den `extension` Ordner aus diesem Projekt

### Schritt 2: API-Server konfigurieren

1. Klicke auf das Poker Coach Icon in der Chrome-Toolbar
2. Gib die URL deines Poker Coach Servers ein:
   - Lokal: `http://localhost:5000`
   - Deployed: Die URL deiner Replit-App
3. Klicke auf **Speichern**
4. Der grüne Punkt zeigt an, dass die Verbindung funktioniert

## Verwendung

### Per Hotkey (empfohlen)

1. Öffne dein Online-Poker-Spiel im Browser
2. Drücke **Ctrl+Shift+P** (Windows/Linux) oder **Cmd+Shift+P** (Mac)
3. Das Overlay zeigt dir sofort die Empfehlung an

### Per Klick

1. Klicke auf das Poker Coach Icon in der Toolbar
2. Klicke auf **Screenshot analysieren**
3. Die Empfehlung wird im Popup und als Overlay angezeigt

## Features

- **Hotkey-Analyse**: Schnelle Analyse mit Ctrl+Shift+P
- **Overlay-Anzeige**: Empfehlung erscheint direkt über dem Spiel
- **Detaillierte Infos**: Zeigt Karten, Position und Begründung
- **Konfidenz-Wert**: Wie sicher ist die KI bei der Empfehlung

## Fehlerbehebung

### "Nicht erreichbar" Fehler
- Stelle sicher, dass der Poker Coach Server läuft
- Überprüfe die API-URL in den Einstellungen
- Bei lokaler Entwicklung: `http://localhost:5000`

### Hotkey funktioniert nicht
- Gehe zu `chrome://extensions/shortcuts`
- Überprüfe, ob der Hotkey für "Poker Coach" konfiguriert ist
- Ändere ihn bei Bedarf, falls er mit anderen Extensions kollidiert

### Screenshot zeigt falsche Seite
- Der Screenshot erfasst immer den sichtbaren Bereich des aktiven Tabs
- Stelle sicher, dass das Poker-Spiel vollständig sichtbar ist
