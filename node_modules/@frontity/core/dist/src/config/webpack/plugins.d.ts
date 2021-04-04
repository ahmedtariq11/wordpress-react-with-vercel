import { Configuration } from "webpack";
import { Target, Mode } from "../../../types";
declare const _default: ({ target, mode, outDir, }: {
    target: Target;
    mode: Mode;
    outDir: string;
}) => Configuration["plugins"];
export default _default;
