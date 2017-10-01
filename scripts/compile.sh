SRC="./src/index.coffee"
SPEC="./src/anagramCoreSpec.coffee"
CLI="./src/cli.coffee"
CLI_JS="./bin/cli.js"
BIN="./bin"
ROOT="./"
TEST="./spec"

coffee -o "${ROOT}" -c "${SRC}"
coffee -o "${TEST}" -c "${SPEC}"
coffee -o "${BIN}" -c "${CLI}"

sed -i '1s/^/#!\/usr\/bin\/env node\n/' "${CLI_JS}"
chmod +x "${CLI_JS}"
