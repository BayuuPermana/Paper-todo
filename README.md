# 🥒 Paper-todo: The Solenya Protocol

Listen up, Jerries. This isn't just another "todo list" app. It’s a high-performance, hand-drawn, focus-inducing workspace designed by a genius (that’s me, Pickle Rick!) to save you from your own disorganized incompetence. *Belch.* 

Most apps are bloated slop. This one? It’s lean. It’s mean. It’s got a "Paper" aesthetic that makes your digital life feel like a physical notebook, without the risk of actual paper cuts.

## 🚀 God-Tier Features

- **Archive Rack (Sidebar)**: Drag and drop your main objectives like you’re reordering timelines. Now with extra width so you can actually read your own handwriting.
- **Focus Engine (Pomodoro)**: A timer with a "Burnout Shield" because I know your puny human brains can't handle 90 minutes of straight logic. It’s even got "Flow Mode" for the real grinders.
- **Evidence Management**: Attach images to your steps. I’ve upgraded the quality so they don’t look like they were taken with a potato. They’re "taped" to the page with premium CSS tape.
- **Neural Shortcuts**: Use `j/k` to navigate your tasks. It’s faster than your mouse, Morty! Use `n` for a new task and `Ctrl+Z` to undo your mistakes (if only life had that button, right?).
- **GodAudio™**: Every action has a sound. Pencil scribbles, paper rustles, and chimes. It’s immersive, okay? Stop asking questions.
- **Scribble Completion**: When you finish a task, we don't just "check" a box. We strike it through with a raw, aggressive scribble. It's satisfying. It’s art.

## 🖼️ Visual Artifacts

### Desktop View
![Desktop Dashboard](./Todo-app.png)

### Mobile Intelligence
<div align="center">
  <img src="./Todo-mobile-B.png" width="45%" alt="Mobile Focus" />
  <img src="./Todo-mobile-a.png" width="45%" alt="Mobile Archive" />
</div>

## 🛠️ How to run this digital artifact (for Jerries)

If you have `Bun`, **`Rust`**, and hopefully a brain, follow these steps:

1. **Clone it**:
   ```bash
   git clone https://github.com/BayuuPermana/Paper-todo.git
   ```
2. **Inject Dependencies**:
   ```bash
   bun install
   ```
3. **Ignite the Engine (Web)**:
   ```bash
   bun run dev
   ```
4. **Ignite the Engine (Native Desktop)**:
   ```bash
   bun tauri dev
   ```
5. **Witness Greatness**: Open the native window and try to be productive for once.

## 🧬 Tech Stack

- **Tauri**: The high-performance native bridge.
- **Rust**: The backbone of the backend. Pure efficiency.
- **SQLite**: Industrial-grade local storage. No cloud Jerries allowed.
- **React**: Because I don't have time to write raw DOM manipulations like a caveman.
- **Bun**: The fastest runtime in the multiverse.
- **Vite**: It's fast. Like, portal-travel fast.
- **React Beautiful DnD**: For the fluid drag-and-drop experience.
- **Vitest**: Because even a god tests his code.

## ⌨️ Neural Shortcuts

Don't touch that mouse, Morty! Use your hands for something useful:
- `j` / `k`: Navigate through your objectives.
- `n`: Focus the "New Objective" input instantly.
- `Ctrl + Z`: Undo your mistakes (locally, I can't fix your life).
- `Esc`: Blur current input and regain control.

## 📂 Storage Protocol

Everything is stored **locally** in a SQLite database (`paper-todo.db`) located in your system's AppData folder. It’s private, it’s persistent, and it’s faster than your father's car.

## 📜 License

This project is licensed under the **"Shut Up and Compute"** license. Use it, learn from it, but don't try to claim you're smarter than me.

Wubba Lubba Dub Dub! 🥒
