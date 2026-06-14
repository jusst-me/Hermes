.PHONY: help install build lint lint-fix format typecheck test dev down logs clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

build: ## Build all packages
	pnpm turbo run build

lint: ## Run ESLint
	pnpm lint

lint-fix: ## Run ESLint with auto-fix
	pnpm lint:fix

format: ## Format all files with Prettier
	pnpm format

typecheck: ## Type-check all packages
	pnpm turbo run typecheck

test: ## Run all tests
	pnpm test

test-watch: ## Run tests in watch mode
	pnpm test:watch

dev: ## Start LocalStack
	docker compose up -d
	@echo "Waiting for LocalStack to be healthy..."
	@docker compose ps | grep -q healthy && echo "LocalStack is ready!" || echo "Run 'make logs' to debug"

down: ## Stop LocalStack
	docker compose down

logs: ## Show LocalStack logs
	docker compose logs -f --tail 50

clean: ## Remove build artifacts and caches
	rm -rf **/dist **/.turbo coverage
	pnpm turbo run build --force
