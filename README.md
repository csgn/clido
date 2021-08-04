```bash
minikube start
eval $(minikube -p minikube docker-env)
minikube addons enable ingress
# Add `<MINIKUBE_IP> clido.com` to /etc/hosts
skaffold dev
```
- And open clido.com in your browser
