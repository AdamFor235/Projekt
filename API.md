# API Documentation

## /expenses Expenses
GET /expenses
Pobiera wszystkie wydatki

GET /expenses/:id
Pobiera pojedynczy wydatek na podstawie id

POST /expenses
Tworzy nowy wydatek

{
  "amount":,
  "description": "",
  "date": "xxxx-xx-xx",
  "categoryId": 
}

PUT /expenses/:id
Aktualizuje wydatek

DELETE /expenses/:id
Usuwa wydatek

GET /expenses/monthly
Zwraca miesięczne wydatki

GET /expenses/suma
Zwraca sumę wszystkich wydatków

GET /expenses/suma/category
Zwraca sumę wydatków pogrupowaną od kategorii

## /exchange-rate Kursy walut
GET /exchange-rate/:currency
Pobiera aktualny kurs wskazanej waluty ( EUR, USD)

## /dashboard Ogólny obraz wydatków
GET /dashboard/:month   xxxx-xx
Zwraca podsumowanie wydatków dla wskazanego miesiąca

## /categories Kategorie
GET /categories
Pobiera wszystkie kategorie

POST /categories
{
  "name": ""
}
Tworzy nową kategorię

PUT /categories/:id
Aktualizuje kategorię

DELETE /categories/:id
Usuwa kategorię

## /budgets Budrzet
GET /budgets
Pobiera wszystkie budżety

POST /budgets
{
  "month": "xxxx-xx",
  "limit": 
}
Tworzy nowy budżet

GET /budgets/:month/status  xxxx-xx
Zwraca status budżetu dla miesiąca razem z kursami EUR USD