import { Configuration } from "webpack";
import { Target, Mode, EntryPoints } from "../../../types";
/**
 * The options of the {@link entry} function.
 */
interface EntryOptions {
    /**
     * The target of the build: "server", "es5" or "module".
     */
    target: Target;
    /**
     * The mode of the build: "development" or "production".
     */
    mode: Mode;
    /**
     * The paths of the entry points generated on the fly by Frontity in the
     * `/build/bundling/entry-points folder`.
     */
    entryPoints: EntryPoints[];
}
/**
 * Generate the object for Webpack's entry configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/entry-context/.
 *
 * @param options - Defined in {@link EntryOptions}.
 *
 * @returns The configuration object for Webpack.
 */
declare const entry: ({ target, mode, entryPoints, }: EntryOptions) => Configuration["entry"];
export default entry;
