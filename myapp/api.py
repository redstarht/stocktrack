from flask import Blueprint, render_template, request, jsonify, redirect,url_for,session
from .model import Zone, Shelf, ProductNumber ,Cell , CellStockStatus ,AllowStorage , InoutLog
from . import db

def 