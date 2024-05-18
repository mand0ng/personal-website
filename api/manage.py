from flask.cli import FlaskGroup
from src import create_app, db, User, TodaysProductDeal

app = create_app()

cli = FlaskGroup(app) 

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command("seed_db")
def seed_db():
    db.session.add(User(email="test2@test2.com"))
    db.session.commit()

@cli.command("delete_todays_deal")
def delete_todays_deal():
    try:
        db.session.query(TodaysProductDeal).delete()
        db.session.commit()
        print("All rows are deleted successfully.")
    except Exception as e:
        db.session.rollback()
        print("Error occurred while deleting data: ". str(e))
    finally:
        db.session.close()


if __name__ == "__main__":
    cli()
    # socketio.run(app, debug=True)