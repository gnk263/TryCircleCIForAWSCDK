PROJECT_NAME := CircleCISample
STACK_NAME := ${PROJECT_NAME}-${SYSTEM_ENV}

create-iam-user-for-circleci:
	aws cloudformation deploy \
		--template-file circleci-iam-user.yaml \
		--stack-name ${STACK_NAME}-for-CircleCI-User \
		--capabilities CAPABILITY_NAMED_IAM \
		--parameter-overrides SystemEnv=${SYSTEM_ENV}

create-iam-user-access-key:
	aws iam create-access-key \
		--user-name ${PROJECT_NAME}-${SYSTEM_ENV}-for-CircleCI-User

delete-iam-user-for-ciecleci:
	aws cloudformation delete-stack \
		--stack-name ${STACK_NAME}-for-CircleCI-User
