# Charity Blockchain System 2.0

下载[Node.js](https://nodejs.org/en) (20.11.0 LTS 即可)。下载好之后右键此电脑，点击属性，点击高级系统设置，点击高级，点击环境变量，在系统变量那里找到 Path，双击 Path，新建 Node.js 的路径 (一般是 C:\Program Files\nodejs\)。完成之后打开终端输入 node -v 以及 npm -v，如果出现版本号证明安装成功。用 VS Code 打开 Charity Blockchain System 2.0. 输入 npm install，输入 npm start，输入 Y。打开终端，输入 cd Charity-Blockchain-System-2.0，输入 cd server，输入 node server.js。在打开的 http://localhost:3000 页面当中，在 Login Page 输入账号 HowAreYou 以及密码 IAmFine 进入账号 (注意大小写)。

### How to Run

- go to the directory name: Charity BlockchainSystem
- npm install
- npm start
- cd server
- node server.js
- go to the website http://localhost:3000
- on the login page enter the account: HowAreYou
- password

### How to Use

- after login, you could create the donation request
- you need to configure the contractAddress under "Desktop/Charity-Blockchain-System-2.0/src/services/Web3Client.js" to have the correct receiving account
