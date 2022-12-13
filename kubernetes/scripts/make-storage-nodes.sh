touch tmp.txt
kubectl get nodes | tail -5 >> tmp.txt
readarray -t arr < <( awk -F ' ' '{ print $1 }' tmp.txt )
rm tmp.txt

for i in "${arr[@]}"
do
   echo "$i"
   kubectl label nodes $i role=db
done