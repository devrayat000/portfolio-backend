function env(name: string): string;
function env(name: string, defaultVal: string): string;
function env(name: string, defaultVal?: string) {
  return process.env[name] ?? defaultVal;
}

namespace env {
  export function int(name: string): number;
  export function int(name: string, defaultVal: number): number;
  export function int(name: string, defaultVal?: number) {
    return env(name) ? parseInt(env(name)) : defaultVal;
  }

  export function float(name: string): number;
  export function float(name: string, defaultVal: number): number;
  export function float(name: string, defaultVal?: number) {
    return env(name) ? parseFloat(env(name)) : defaultVal;
  }

  export function array(name: string): string[];
  export function array(name: string, defaultVal: string[]): string[];
  export function array(name: string, defaultVal?: string[]) {
    return env(name)?.split(",") ?? defaultVal;
  }
}

export { env };
