from flask import Blueprint, render_template, request, jsonify, redirect, url_for
views = Blueprint(__name__, "views")
import SudokuSolver
from SudokuSolver import board, generate_new_puzzle, solve, is_solvable

@views.route("/")
def home():
    return render_template("index.html", name="Aleen", age=22)

@views.route("/profile")
def profile():
    args = request.args
    name = args.get('name')
    return render_template("index.html", name=name)

@views.route("/json")
def get_json():
    return jsonify({'name': 'aleen', 'durerea': 10})


@views.route("/data")
def get_data():
    data = request.json
    return jsonify(data)

@views.route("/go-to-home")
def go_to_home():
    return redirect(url_for("views.home"))

@views.route("/sudokuSolver", methods = ["POST"])
def sudokuS():
    if request.method == "POST":
        data = request.get_json()
        rezultat = is_solvable(data) 
        
    return {"response": rezultat}

@views.route("/solve_puzzle", methods = ["POST"])
def solveP():
    if request.method == "POST":
        data = request.get_json()
        rezultat = solve(data)
        
    return {"response": data}


@views.route("/generate_puzzle")
def new_puzzle():
    generate_new_puzzle(board)
    puzzle = board
    response = {'puzzle': puzzle}
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response