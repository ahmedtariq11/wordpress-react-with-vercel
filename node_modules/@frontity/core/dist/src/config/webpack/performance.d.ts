import { Configuration } from "webpack";
import { Target } from "../../../types";
/**
 * The options of the {@link performance} function.
 */
interface PerformanceOptions {
    /**
     * The target of the build: "server", "es5" or "module".
     */
    target: Target;
}
/**
 * Generate the object for Webpack's performance configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/performance/.
 *
 * @param options - Defined in {@link PerformanceOptions}.
 *
 * @returns The configuration object for Webpack.
 */
declare const performance: ({ target, }: PerformanceOptions) => Configuration["performance"];
export default performance;
