# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b13bca7b-e5d1-4eeb-98d0-6da2cb017145

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b13bca7b-e5d1-4eeb-98d0-6da2cb017145) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```


## How to build and deploy?

**Build and run with Docker**
```sh
#install dependencies and build the project
npm install 
npm run build

#build a docker image
docker build -t <YOUR_PROJECT_NAME> .

#push the docker image to docker hub
docker tag <YOUR_PROJECT_NAME> <YOUR_DOCKERHUB_USERNAME>/<YOUR_PROJECT_NAME>
docker push <YOUR_DOCKERHUB_USERNAME>/<YOUR_PROJECT_NAME>
newdockeruser123/cinesearch:1.0.2
#run the docker image
docker run -p 3000:80 <YOUR_PROJECT_NAME>  --name <CONTAINER_NAME>

```

**openshift**
```sh
#open shift deploy
oc login --token=sha256~BxytCSKGiYnFcaGkChxiASL_kx_TGcPQr5mrjGC5zGE --server=https://api.rm2.thpm.p1.openshiftapps.com:6443
oc new-app <YOUR_DOCKERHUB_USERNAME>/<YOUR_PROJECT_NAME>
oc expose svc/<YOUR_PROJECT_NAME>
oc get routes

```


**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b13bca7b-e5d1-4eeb-98d0-6da2cb017145) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
