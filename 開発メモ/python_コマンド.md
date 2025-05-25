### SQLalchemy テーブルのCREATE

```bash
$ pipenv shell
$ python
>>> 
from myapp.extensions import db
from myapp import model,create_app
app = create_app()
with app.app_context():
>>> db.create_all()
```





### 仮想環境のディレクトリ表示
```bash
python -c "import sys; print(sys.executable)"
```


### 

myapp\model.py