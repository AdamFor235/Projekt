# System Zarządzania Budrzetem API

Prosty backend do zarządzania wydatkami użytkownika.

## Tech Stack
- Node.js
- Express
- MySQL
- Sequelize

## Funkcje
- Dodawanie wydatków
- Lista wydatków
- Edycja wydatków
- Usuwanie wydatków
- Kategorie zmiana

## Instalacja

## Uruchomienie

npm start
(docker compose up)

## Testy

npm test

## Architektura


# Database Schema
```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#ffffff",
    "primaryTextColor": "#000000",
    "primaryBorderColor": "#3b82f6",
    "lineColor": "#60a5fa",
    "secondaryColor": "#ffffff",
    "tertiaryColor": "#ffffff"
  }
}}%%
erDiagram

CATEGORY ||--o{ EXPENSE : contains

CATEGORY {
    int id
    string name
}

EXPENSE {
    int id
    float amount
    string description
    date date
    int categoryId
}

BUDGET {
    int id
    string month
    decimal limit
    datetime created_at
    datetime updated_at
}
```
## API
https://github.com/AdamFor235/Projekt/blob/main/API.md

## Railway link 
https://twoj-backend-production.up.railway.app:8080/