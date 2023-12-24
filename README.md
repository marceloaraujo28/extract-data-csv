# Node.js Task API

This is a simple Node.js API that provides CRUD operations to manage tasks. Additionally, it includes functionality to read tasks from a CSV file and save them to the local database.

## Features

- Create a new task
- List all tasks
- Mark a task as completed
- Read tasks from a CSV file and save them to the local database

## Prerequisites

Make sure you have Node.js installed on your machine.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/marceloaraujo28/extract-data-csv.git
   ```

2. Install dependencies:

- cd extract-data-csv
- npm install

3. Usage

   ```bash
   npm run dev
   ```

## ENDPOINTS

- `POST /tasks` - Create a new task.
- `GET /tasks` - Retrieve all tasks.
- `PUT /tasks/:id` - Mark a task as completed.
- `DELETE /tasks/:id` - Delete a task
- `PATCH /tasks/:id/complete` - Mark a task as completed
