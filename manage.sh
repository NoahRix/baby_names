#!/bin/bash

# Colors for better UI
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Docker compose files and project names
DEV_COMPOSE="docker-compose.dev.yml"
PROD_COMPOSE="docker-compose.prod.yml"
DEV_PROJECT="baby-names-dev"
PROD_PROJECT="baby-names-prod"

# Function to print header
print_header() {
    clear
    echo -e "${CYAN}${BOLD}"
    echo "╔════════════════════════════════════════╗"
    echo "║   Docker Compose Manager - Baby Names  ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Function to print menu
print_menu() {
    print_header
    echo -e "${BOLD}Select an option:${NC}\n"
    echo -e "${GREEN}  Development Environment:${NC}"
    echo -e "    ${CYAN}1)${NC} Start Dev"
    echo -e "    ${CYAN}2)${NC} Stop Dev"
    echo -e "    ${CYAN}3)${NC} Restart Dev"
    echo ""
    echo -e "${MAGENTA}  Production Environment:${NC}"
    echo -e "    ${CYAN}4)${NC} Start Prod"
    echo -e "    ${CYAN}5)${NC} Stop Prod"
    echo -e "    ${CYAN}6)${NC} Restart Prod"
    echo ""
    echo -e "${YELLOW}  Utilities:${NC}"
    echo -e "    ${CYAN}7)${NC} View Status (Dev)"
    echo -e "    ${CYAN}8)${NC} View Status (Prod)"
    echo -e "    ${CYAN}9)${NC} View Logs (Dev)"
    echo -e "    ${CYAN}10)${NC} View Logs (Prod)"
    echo ""
    echo -e "${RED}  0)${NC} Exit"
    echo ""
}

# Function to start dev
start_dev() {
    echo -e "${GREEN}${BOLD}Starting Development Environment...${NC}"
    if docker compose -f "$DEV_COMPOSE" -p "$DEV_PROJECT" up --build -d; then
        echo -e "${GREEN}✓ Development environment started${NC}"
    else
        echo -e "${RED}✘ Failed to start development environment${NC}"
        echo "Common cause: a container name is already in use (conflict)."
        echo "Find conflicting containers (example looks for 'mariadb'):
  docker ps -a --filter 'name=mariadb' --format '{{.ID}} {{.Names}}'"
        echo "Remove the conflicting container by id or name:
  docker rm -f <container-id-or-name>"
        echo "Then retry: ./manage.sh start-dev"
        return 1
    fi
}

# Function to stop dev
stop_dev() {
    echo -e "${YELLOW}${BOLD}Stopping Development Environment...${NC}"
    docker compose -f "$DEV_COMPOSE" -p "$DEV_PROJECT" down --remove-orphans
    echo -e "${YELLOW}✓ Development environment stopped${NC}"
}

# Function to restart dev
restart_dev() {
    echo -e "${YELLOW}${BOLD}Restarting Development Environment...${NC}"
    docker compose -f "$DEV_COMPOSE" -p "$DEV_PROJECT" restart
    echo -e "${GREEN}✓ Development environment restarted${NC}"
}

# Function to start prod
start_prod() {
    echo -e "${GREEN}${BOLD}Starting Production Environment...${NC}"
    if docker compose -f "$PROD_COMPOSE" -p "$PROD_PROJECT" up --build -d; then
        echo -e "${GREEN}✓ Production environment started${NC}"
    else
        echo -e "${RED}✘ Failed to start production environment${NC}"
        echo "Possible container name conflict. Find containers:
  docker ps -a --filter 'name=mariadb' --format '{{.ID}} {{.Names}}'"
        echo "Remove conflicting container:
  docker rm -f <container-id-or-name>"
        echo "Then retry: ./manage.sh start-prod"
        return 1
    fi
}

# Function to stop prod
stop_prod() {
    echo -e "${YELLOW}${BOLD}Stopping Production Environment...${NC}"
    docker compose -f "$PROD_COMPOSE" -p "$PROD_PROJECT" down --remove-orphans
    echo -e "${YELLOW}✓ Production environment stopped${NC}"
}

# Function to restart prod
restart_prod() {
    echo -e "${YELLOW}${BOLD}Restarting Production Environment...${NC}"
    docker compose -f "$PROD_COMPOSE" -p "$PROD_PROJECT" restart
    echo -e "${GREEN}✓ Production environment restarted${NC}"
}

# Function to view dev status
status_dev() {
    echo -e "${BLUE}${BOLD}Development Environment Status:${NC}"
    docker compose -f "$DEV_COMPOSE" -p "$DEV_PROJECT" ps
}

# Function to view prod status
status_prod() {
    echo -e "${BLUE}${BOLD}Production Environment Status:${NC}"
    docker compose -f "$PROD_COMPOSE" -p "$PROD_PROJECT" ps
}

# Function to view dev logs
logs_dev() {
    echo -e "${BLUE}${BOLD}Development Environment Logs (Ctrl+C to exit):${NC}"
    docker compose -f "$DEV_COMPOSE" -p "$DEV_PROJECT" logs -f
}

# Function to view prod logs
logs_prod() {
    echo -e "${BLUE}${BOLD}Production Environment Logs (Ctrl+C to exit):${NC}"
    docker compose -f "$PROD_COMPOSE" -p "$PROD_PROJECT" logs -f
}

# Print non-interactive usage
print_usage() {
    cat <<EOF
Usage: $0 <command>

Commands:
  start-dev, stop-dev, restart-dev
  start-prod, stop-prod, restart-prod
  status-dev, status-prod
  logs-dev, logs-prod
  start <dev|prod>
  stop <dev|prod>
  restart <dev|prod>
  status <dev|prod>
  logs <dev|prod>
  help

If no arguments are provided the interactive menu is shown.
EOF
}

# If called with arguments, run corresponding action and exit (non-interactive)
if [ "$#" -gt 0 ]; then
    cmd="$1"
    env="$2"
    case "$cmd" in
        start-dev|start_dev|dev-start|startdev)
            start_dev
            exit 0
            ;;
        stop-dev|stop_dev|dev-stop|stopdev)
            stop_dev
            exit 0
            ;;
        restart-dev|restart_dev|dev-restart|restartdev)
            restart_dev
            exit 0
            ;;
        start-prod|start_prod|prod-start|startprod)
            start_prod
            exit 0
            ;;
        stop-prod|stop_prod|prod-stop|stopprod)
            stop_prod
            exit 0
            ;;
        restart-prod|restart_prod|prod-restart|restartprod)
            restart_prod
            exit 0
            ;;
        status-dev|status_dev|dev-status)
            status_dev
            exit 0
            ;;
        status-prod|status_prod|prod-status)
            status_prod
            exit 0
            ;;
        logs-dev|logs_dev|dev-logs)
            logs_dev
            exit 0
            ;;
        logs-prod|logs_prod|prod-logs)
            logs_prod
            exit 0
            ;;
        start|stop|restart|status|logs)
            if [ -z "$env" ]; then
                echo "Environment required: dev or prod"
                print_usage
                exit 2
            fi
            case "$env" in
                dev|development)
                    case "$cmd" in
                        start) start_dev ;;
                        stop) stop_dev ;;
                        restart) restart_dev ;;
                        status) status_dev ;;
                        logs) logs_dev ;;
                    esac
                    ;;
                prod|production)
                    case "$cmd" in
                        start) start_prod ;;
                        stop) stop_prod ;;
                        restart) restart_prod ;;
                        status) status_prod ;;
                        logs) logs_prod ;;
                    esac
                    ;;
                *)
                    echo "Unknown environment: $env"
                    print_usage
                    exit 2
                    ;;
            esac
            exit 0
            ;;
        help|-h|--help)
            print_usage
            exit 0
            ;;
        *)
            echo "Unknown command: $cmd"
            print_usage
            exit 2
            ;;
    esac
fi

# Function to pause for user
pause() {
    echo ""
    read -p "Press [Enter] to continue..."
}

# Main loop
while true; do
    print_menu
    read -p "Enter your choice [0-10]: " choice
    echo ""
    
    case $choice in
        1)
            start_dev
            pause
            ;;
        2)
            stop_dev
            pause
            ;;
        3)
            restart_dev
            pause
            ;;
        4)
            start_prod
            pause
            ;;
        5)
            stop_prod
            pause
            ;;
        6)
            restart_prod
            pause
            ;;
        7)
            status_dev
            pause
            ;;
        8)
            status_prod
            pause
            ;;
        9)
            logs_dev
            ;;
        10)
            logs_prod
            ;;
        0)
            echo -e "${GREEN}${BOLD}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            pause
            ;;
    esac
done
