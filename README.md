High performance Stratum poolserver in Node.js. One instance of this software can startup and manage multiple coin
pools, each with their own daemon and stratum port :)

#### Notice
This is a module for Node.js that will do nothing on its own. Unless you're a Node.js developer who would like to
handle stratum authentication and raw share data then this module will not be of use to you. For a full featured portal
that uses this module, see [NOMP (Node Open Mining Portal)](https://github.com/zone117x/node-open-mining-portal). It
handles payments, website front-end, database layer, mutli-coin/pool support, auto-switching miners between coins/pools,
etc.. The portal also has an [MPOS](https://github.com/MPOS/php-mpos) compatibility mode so that the it can function as
a drop-in-replacement for [python-stratum-mining](https://github.com/Crypto-Expert/stratum-mining).

#### Why
This server was built to be more efficient and easier to setup, maintain and scale than existing stratum poolservers
which are written in python. Compared to the spaghetti state of the latest
[stratum-mining python server](https://github.com/Crypto-Expert/stratum-mining/), this software should also have a
lower barrier to entry for other developers to fork and add features or fix bugs.


Features
----------------------------------
* Daemon RPC interface
* Stratum TCP socket server
* Block template / job manager
* P2P to get block notifications as peer node
* Optimized generation transaction building
* Connecting to multiple daemons for redundancy
* Process share submissions
* Session managing for purging DDoS/flood initiated zombie workers
* Auto ban IPs that are flooding with invalid shares
* Transaction messages support
* Vardiff (variable difficulty / share limiter)
* When started with a coin deamon that hasn't finished syncing to the network it shows the blockchain download progress and initializes once synced

License
-------
Released under the GNU General Public License v2

http://www.gnu.org/licenses/gpl-2.0.html
