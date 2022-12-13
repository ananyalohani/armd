while read -r LINE
do
    ssh -o StrictHostKeyChecking=no -p22 $LINE 'sudo -Sv && bash -s' < install-kube.sh &
done < hostlist.txt

echo "Initialized nodes, joining them to the network"

cmd="sudo ${1}"

while read -r LINE
do
    ssh -o StrictHostKeyChecking=no -p22 $LINE $cmd &
done < hostlist.txt
wait
