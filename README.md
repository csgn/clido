```bash
minikube start
eval $(minikube -p minikube docker-env)
minikube addons enable ingress
skaffold dev
```
