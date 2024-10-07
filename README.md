The Markov Eklypse performs protein-protein docking simulations with 96.63% accuracy. The ChatGPT clone is trained on the NIH database and outsources the proprietary Integral-SEQ logo from outside of its 
main directory along with the proprietary node module used to access the NIH database.
The Docking Simulator contains instructions for how it is to be used and access the AlphaFold and Protein Databanks. When the Simulator is finished the pdb file is automatically downloaded into the
users computer. Afterwards the outputted PDB file can be usted to test the model against the real world thereby accelerating personalized medicine by drastically reducing the number of experiments needed to be performed to obtain biomarkers, drug targets, interactions between a biologic and 
a protein responsible for a disease etc. The Markov Viewer can be used to have a quick view of the mutually bonded proteins.

Installing the MarkovEklypse:
You will need git installed on azure for this.
First clone the repository with the following command:
git clone https://github.com/jenningsje/MarkovEklypse

Installing the submodules:
git clone --recurse-submodules https://github.com/jenningsje/MarkovDocker5
git clone --recursive-submodules https://github.com/jenningsje/Markov-Bot
git clone --recursive-submodules https://github.com/jenningsje/Download

Dockerizing the image for the ChatBot (a.k.a. MarkovBot):
1. To Dockerize the ChatBot navigate to ./MarkovBot/docker-app relative to this respository and run the following commands:
2. GNU/Linux & Mac OSX:
3. chmod u+x dockerize.sh
4. ./dockerize.sh

Dockerizing the image for the Docking Simulator (a.k.a. MarkovDocker):
1. Navigate to MarkovDocker
2. Run the following commands
3. docker-compose build
4. docker-compose up

Software Requirments:
GNU/Linux, Microsoft Azure or MacOSX
git
Docker

James Jennings, Co-Founder, Integral-SEQ, jjennings@integral-seq.com
