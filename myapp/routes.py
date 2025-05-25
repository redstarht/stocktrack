from flask import Blueprint, render_template, request, jsonify, redirect,url_for,session
main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

    