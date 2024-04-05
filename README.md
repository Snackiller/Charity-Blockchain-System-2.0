# Charity Blockchain System 2.0

<!-- ### 如何运行

下载[Node.js](https://nodejs.org/en) (20.11.0 LTS 即可)。下载好之后右键此电脑，点击属性，点击高级系统设置，点击高级，点击环境变量，在系统变量那里找到 Path，双击 Path，新建 Node.js 的路径 (一般是 C:\Program Files\nodejs\)。完成之后打开终端输入 node -v 以及 npm -v，如果出现版本号证明安装成功。用 VS Code 打开 Charity Blockchain System 2.0. 输入 npm install，输入 npm start，输入 Y。打开终端，输入 cd Charity-Blockchain-System-2.0，输入 cd server，输入 node server.js。在打开的 http://localhost:3000 页面当中，在 Login Page 输入账号 HowAreYou 以及密码 IAmFine 进入账号 (注意大小写)。

### 下载 ResilientDB

找到[ResilientDB](https://github.com/apache/incubator-resilientdb)下载界面。打开 Ubuntu 输入 get clone https://github.com/apache/incubator-resilientdb.git 。之后找到 incubator-resilientdb 这个文件的位置并打开它。输入(./INSTALL.sh)，.(/service/tools/kv/server_tools/start_kv_service.sh)，(bazel build service/tools/kv/api_tools/kv_service_tools) 这三个指令。配置好之后输入 (cat $PWD/service/tools/config/interface/service.config) 检查地址。如果地址不是 5 44.193.63.142 17005 输入 (nano $PWD/service/tools/config/interface/service.config) 修改地址。最后输入 (bazel run //service/tools/kv/api_tools:kv_service_tools $PWD/service/tools/config/interface/service.config set test 123) 和 (bazel run //service/tools/kv/api_tools:kv_service_tools $PWD/service/tools/config/interface/service.config get test) 检查是否工作。 -->

### How to Run

- npm install
- npm install @chakra-ui/react
  
- cd server
- node server.js
- npm start

- go to the website http://localhost:3000
- on the login page enter the account: HowAreYou
- password: IAmFine

### How to Use

- after login, you could create the donation request
- you need to configure the contractAddress under "Desktop/Charity-Blockchain-System-2.0/src/services/Web3Client.js" to have the correct receiving account
