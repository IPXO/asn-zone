SHELL := /bin/bash

# Paths
WEB_DIR := apps/web
DATA_DIR := data
PY_DIR := scripts
VENV := $(PY_DIR)/.venv
PY := python3
PIP := $(VENV)/bin/pip

# ----- Setup -----
.PHONY: setup
setup:
	@echo ">> Node install (web)"
	cd $(WEB_DIR) && (npm ci || npm install)
	@echo ">> Python venv + deps (pipeline)"
	$(PY) -m venv $(VENV)
	$(PIP) install --upgrade pip
	@test -f $(PY_DIR)/requirements.txt || echo "# add deps here" > $(PY_DIR)/requirements.txt
	$(PIP) install -r $(PY_DIR)/requirements.txt
	@echo "Setup complete."

# ----- Web (Next.js) -----
.PHONY: web-dev
web-dev:
	cd $(WEB_DIR) && npm run dev

.PHONY: web-build
web-build:
	cd $(WEB_DIR) && npm run build

# ----- Data pipeline (stub) -----
SNAPSHOT := $(shell date -u +%F)

.PHONY: data-refresh
data-refresh:
	mkdir -p $(DATA_DIR)/current
	echo '{"status":"ok","note":"replace with real dataset"}' > $(DATA_DIR)/current/global.json
	@echo "Wrote $(DATA_DIR)/current/global.json"

.PHONY: data-snapshot
data-snapshot:
	mkdir -p $(DATA_DIR)/snapshots/$(SNAPSHOT)
	cp -R $(DATA_DIR)/current/* $(DATA_DIR)/snapshots/$(SNAPSHOT)/
	@echo "Snapshotted to $(DATA_DIR)/snapshots/$(SNAPSHOT)/"

# ----- Hygiene -----
.PHONY: clean
clean:
	rm -rf $(WEB_DIR)/.next $(WEB_DIR)/out $(PY_DIR)/.venv

.PHONY: check
check:
	node -v && $(PY) --version || true
