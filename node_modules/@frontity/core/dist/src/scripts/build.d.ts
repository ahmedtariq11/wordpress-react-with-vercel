import "./utils/envs";
import { Mode } from "../../types";
/**
 * The options of the build command.
 */
export interface BuildOptions {
    /**
     * The Webpack mode used, either "development" or "production".
     *
     * @defaultValue "production"
     */
    mode: Mode;
    /**
     * The JavaScript transpilation target. Either "es5" or "module".
     *
     * @defaultValue "both"
     */
    target: "es5" | "module" | "both";
    /**
     * The publicPath used in Webpack.
     *
     * @defaultValue "/static/"
     */
    publicPath: string;
}
declare const _default: ({ mode, target, publicPath, }: BuildOptions) => Promise<void>;
/**
 * The Frontity build command that creates all the bundles and assets necessary
 * to run the Frontity server.
 *
 * @param options - Defined in {@link BuildOptions}.
 *
 * @returns A promise that resolves when the build has finished.
 */
export default _default;
