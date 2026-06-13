# API Documentation

## /expenses Expenses
GET /expenses
Pobiera wszystkie wydatki

GET /expenses/
Pobiera pojedynczy wydatek na podstawie id

POST /expenses
Tworzy nowy wydatek

PUT /expenses/
Aktualizuje wydatek

DELETE /expenses/
Usuwa wydatek

GET /expenses/monthly
Zwraca miesięczne wydatków

GET /expenses/suma
Zwraca sumę wszystkich wydatków

GET /expenses/suma/category
Zwraca sumę wydatków pogrupowaną od kategorii

## /exchange-rate Kursy walut
GET /exchange-rate/
Pobiera aktualny kurs wskazanej waluty ( EUR, USD)

## /dashboard Ogólny obraz wydatków
GET /dashboard/
Zwraca podsumowanie wydatków dla wskazanego miesiąca

## /categories Kategorie
GET /categories
Pobiera wszystkie kategorie

POST /categories
Tworzy nową kategorię

PUT /categories/
Aktualizuje kategorię

DELETE /categories/
Usuwa kategorię

## /budgets Budrzet
GET /budgets
Pobiera wszystkie budżety

POST /budgets
Tworzy nowy budżet

GET /budgets/:month/status
Zwraca status budżetu dla miesiąca razem z kursami EUR USD