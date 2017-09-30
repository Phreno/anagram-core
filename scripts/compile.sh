BIN="./bin/index.coffee"
SPEC="./bin/anagramCoreSpec.coffee"
ROOT="./"
TEST="./spec"

coffee -o "${ROOT}" -c "${BIN}"
coffee -o "${TEST}" -c "${SPEC}"
