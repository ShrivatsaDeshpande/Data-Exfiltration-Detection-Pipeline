from pipeline.seed_db import seed_database

if __name__ == "__main__":
    seed_database(rows=250)
    print("Database seeded successfully with synthetic dataset.")