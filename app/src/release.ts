import appPackage from '../package.json';

export const appVersion = appPackage.version;
export const contentVersion = appPackage.version;
const rawBuildRef: unknown = import.meta.env['VITE_BUILD_REF'];
export const buildRef =
  typeof rawBuildRef === 'string' && rawBuildRef.length > 0 ? rawBuildRef : 'local';

export function formatVersionLabel(): string {
  return `App v${appVersion} / content v${contentVersion} / build ${buildRef}`;
}
