from flask import Flask, Response, jsonify, redirect, render_template, request, url_for
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)
CORS(app)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_POST'] = '5000'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'fire_supression_ai'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/api/<function>', methods = ['POST'])
def api(function):
    if function == 'updateThreshold':
        jsonData = request.get_json()

        try:
            cur = mysql.connection.cursor()
            sql = 'INSERT INTO threshold VALUES(NULL, %s, %s, %s, NULL)'
            values = (jsonData.get('lightValue'), jsonData.get('heatValue'), jsonData.get('smokeValue'))

            cur.execute(sql, values)
            mysql.connection.commit()
            cur.close()

            data = {
                'success': True
            }
        except:
            data = {
                'success': False
            }
        else:
            return jsonify(data)
    elif function == 'getThreshold':
        try:
            cur = mysql.connection.cursor()
            sql = 'SELECT light, heat, smoke FROM threshold ORDER BY timestamp DESC LIMIT 1'
            cur.execute(sql)
            data = cur.fetchone()

            data = {
                'light': data[0],
                'heat': data[1],
                'smoke': data[2]
            }

            return jsonify(data)
        except:
            pass
    else:
        return Response('<h1>ERROR 400: BAD_REQUEST</h1>', status=400)


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5010)