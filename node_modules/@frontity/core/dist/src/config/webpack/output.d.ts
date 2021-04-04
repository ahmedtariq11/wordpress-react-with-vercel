import { Configuration } from "webpack";
import { Target, Mode } from "../../../types";
declare const _default: ({ target, mode, outDir, publicPath, }: {
    target: Target;
    mode: Mode;
    outDir: string;
    publicPath: string;
}) => Configuration["output"];
export default _default;
