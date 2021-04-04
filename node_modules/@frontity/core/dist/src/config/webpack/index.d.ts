import { Mode, WebpackConfigs, BabelConfigs, EntryPoints, FrontityConfig } from "../../../types";
/**
 * The options of the {@link webpack} function.
 */
interface WebpackOptions {
    /**
     * The mode of the build: "development" or "production".
     */
    mode: Mode;
    /**
     * The paths of the entry points generated on the fly by Frontity in the
     * `/build/bundling/entry-points folder`.
     */
    entryPoints: EntryPoints[];
    /**
     * The public path of Webpack.
     */
    publicPath: string;
    /**
     * The config of Babel, generated in the previous step.
     */
    babel: BabelConfigs;
    /**
     * The config of Frontity, generated in the previous step.
     */
    frontity: FrontityConfig;
}
/**
 * Generate the object for Webpack configuration.
 *
 * Official Webpack docs: https://webpack.js.org/.
 *
 * @param options - Defined in {@link WebpackOptions}.
 *
 * @returns The configuration objects for Webpack.
 */
declare const webpack: (options: WebpackOptions) => WebpackConfigs;
export default webpack;
