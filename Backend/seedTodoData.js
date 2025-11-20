// server/seedTodoData.js
const mongoose = require("mongoose");
require("dotenv").config();

// Use your DB URL (fall back to local if needed)
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/todolist";

// Schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
});

const Todo = mongoose.model("todo", todoSchema);

async function seedTodos() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB…");

    // Clear existing data
    await Todo.deleteMany({});
    console.log("Cleared existing todos");

    // Insert your mock data
    const mockTodos = [
      { title: "Complete CI/CD pipeline", description: "Finish GitHub Actions setup for MERN app" },
      { title: "Write unit tests", description: "Add tests for POST, GET, PUT, DELETE routes" },
      { title: "Prepare Docker images", description: "Containerize frontend and backend services" },
      { title: "Review PRs", description: "Review teammate's PR for refactoring" },
      { title: "Study Terraform", description: "Watch intro videos about IaC" },
      { title: "Plan Kubernetes practice", description: "Deploy microservice on k3d cluster" },
      { title: "Clean workspace", description: "Organize dev environment folders" },
      { title: "Update resume", description: "Add Docker and CI/CD project" },
      { title: "Configure AWS EC2", description: "Set up SSH and Docker runtime" },
      { title: "Read DevOps blog", description: "Learn about networking models" },
    ];

    await Todo.insertMany(mockTodos);
    console.log("Inserted mock todo items");

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
  }
}

seedTodos();
