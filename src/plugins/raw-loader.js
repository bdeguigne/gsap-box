import fs from 'fs';
import path from 'path';

/**
 * Plugin Vite pour charger le contenu brut des fichiers
 * Permet d'accéder au contenu source des fichiers via l'URL ?raw
 */
export default function rawLoader() {
  return {
    name: 'vite-plugin-raw-loader',
    resolveId(source) {
      if (source.endsWith('?raw')) {
        return source;
      }
      return null;
    },
    load(id) {
      if (id.endsWith('?raw')) {
        const filePath = id.replace('?raw', '');
        const realPath = path.resolve(filePath);
        
        try {
          const fileContent = fs.readFileSync(realPath, 'utf-8');
          return `export default ${JSON.stringify(fileContent)};`;
        } catch (error) {
          console.error(`Erreur lors de la lecture du fichier: ${realPath}`, error);
          return 'export default "// Erreur lors du chargement du fichier source";';
        }
      }
      return null;
    }
  };
}
