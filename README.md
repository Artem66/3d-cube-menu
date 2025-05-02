🧊 Smooth 3D Menu Cube Navigation with React Three Fiber
This project is a 3D interactive cube menu built using React Three Fiber and drei, where each face of the cube represents a section like "Home", "About", "Contact", etc. Hovering over a menu item smoothly rotates the camera to the relevant cube face — while still allowing full manual control with the mouse.

✨ Features
🎯 Smooth camera transitions to cube faces on hover

🖱️ Full mouse interaction (OrbitControls)

💨 Cancel hover animation when user starts rotating

🧭 Auto-animation resumes only on new hover

⚙️ Built with react-three-fiber and @react-three/drei

🧪 Demo Behavior
Hover over the sidebar text (e.g., About, Services, etc.)
→ the cube rotates smoothly to face that side.

Rotate the cube manually using your mouse or trackpad.
→ auto-animation is paused so user interaction stays in control.

Hover again over a menu item
→ camera transitions smoothly to the new face again.

🛠️ Setup
bash
Copy
Edit
# Clone and install dependencies
git clone https://github.com/your-username/3d-menu-cube.git
cd 3d-menu-cube
npm install
🚀 Run the app
npm start
Open your browser to http://localhost:3000.

📁 Project Structure

src/
├── App.js           # Main app logic (camera, controls, menu, etc.)
├── MenuCube.js      # 3D cube with labeled sides
├── index.js         # ReactDOM render entry

🔧 Dependencies
react-three-fiber

@react-three/drei

three.js

📜 License
MIT — feel free to use and modify.
