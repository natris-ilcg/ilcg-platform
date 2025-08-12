DESTINATION="ubuntu@13.124.66.222:~/platform"

rsync -e "ssh -i ${SSH_KEY_FILE_ILCG_PLATFORM}" -ravhzu --progress --delete app_platform.js ${DESTINATION}/app_platform.js
rsync -e "ssh -i ${SSH_KEY_FILE_ILCG_PLATFORM}" -ravhzu --progress --delete ./package.json ${DESTINATION}/package.json