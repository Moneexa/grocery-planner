# grocery-planner

The project comprises of 2 parts. Grocery planner FrontEnd and GroceryPlanner Backend.

## Clone the Repo:
git clone https://github.com/Moneexa/grocery-planner.git



# Grocery Planner Backend

This is the backend of the **Grocery Planner** application, built using Django. It provides APIs for managing grocery lists, recipes, meal planning, and user. This backend serves as the core of the application, ensuring secure data handling and efficient processing for all operations.

---

## Features and Functionalities

### **User Management**
- User registration with email using Google OAuth.


### **Meal Planning**
- Create meal plans for (1-10) days by linking recipes to specific days.
- Configure recipes in the plan.
- Track meal plans dynamically.
- Fetch a list of all planned meals for a given week.


### **Recipe Management**
- Create, and retrieve recipes.
- Retrieves recipes from ODA's api
- Search for recipes based on available ingredients.
-  Fetch a list of all recipes for the selected plan.


### **Search and Filtering**
- Search for recipes by name and dietary preference.
- Filter recipes by the category e.g(frukost, lunsj, middag).


### **Grocery Management**
- Add, and retrieve grocery items.
- Get Grocery Items from ODA's api based on Recipe ingredients of the current plan.
- Mark grocery items as purchased or pending.



### **Database Integration**
- Use PostgreSQL for production and SQLite for local development.
- Migrations ensure smooth database schema updates.

### **Error Handling**
- Graceful handling of invalid inputs with appropriate error messages.
- Detailed API responses for debugging during development.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Python 3.8+ ([Download Python](https://www.python.org/))
- pip (Python package manager)
- A virtual environment tool (e.g., `venv`)
- Sqlite

---

## Setup Instructions
###1. Enter the repo.
`cd backend`
###2. Set Up a Virtual Environment
`python -m venv venv`
###3. Activate the virtual environment:

####1. Windows:
`venv\Scripts\activate`
####2. Linux/MacOS:
`source venv/bin/activate`
###3. Install Dependencies
`pip install -r requirements.txt`
###4. Apply Migrations
`python manage.py makemigrations`
`python manage.py migrate`
###5. Run the Development Server
`python manage.py runserver`

#Grocery Planner Frontend
This is the frontend for the grocery planner app. It is built using React.

## Features

- **Authentication**: Login, registration for users.
- **Grocery Management**: Add, and view grocery items.
- **Recipe Management**: Create, and browse recipes.
- **Meal Planning**: Create and view created meal plans.
- **Insighs**: Insights in the form of graphs using chartJS. They give insights on cost spend per ingredient and other cost of previous plans.


## Prerequisites

Ensure you have the following installed before setting up the frontend:

- **Node.js**: Version 16+ ([Download Node.js](https://nodejs.org/))
- **Package Manager**: `npm` (comes with Node.js) or `pnpm`/`yarn` if preferred.
- A running instance of the **Grocery Planner Backend** (see backend instructions).


## Setup Instructions

### 1. Clone the Repository
`cd frontend`

###2. Install Dependencies
`npm install`

###3. Run the Development Server
`npm run dev`

###4. This will start the development server. The frontend can be accessed at:
`http://localhost:3000`

