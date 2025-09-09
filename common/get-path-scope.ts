/**
 * Determines the scope of a given path based on its prefix
 * @param path - The path to analyze
 * @returns The scope: 'user' for /administrativo paths, 'student' for /alumno paths, 'public' for others
 */
export function getPathScope(path: string): 'user' | 'student' | 'public' {
  if (path.startsWith('/administrativo')) {
    return 'user'
  }

  if (path.startsWith('/alumno')) {
    return 'student'
  }

  return 'public'
}
