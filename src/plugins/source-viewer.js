import fs from 'fs';
import path from 'path';

/**
 * Plugin Vite pour servir les fichiers source via une API HTTP
 * Permet d'accéder au contenu source des fichiers via l'URL /src-viewer?file=chemin/du/fichier
 */
export default function sourceViewer() {
  return {
    name: 'vite-plugin-source-viewer',
    configureServer(server) {
      server.middlewares.use('/src-viewer', (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const filePath = url.searchParams.get('file');
        
        if (!filePath) {
          res.statusCode = 400;
          res.end('Paramètre "file" manquant');
          return;
        }
        
        // Sécurité: s'assurer que le chemin est relatif au projet
        const rootDir = process.cwd();
        const fullPath = path.resolve(rootDir, filePath);
        
        // Vérifier que le chemin est bien dans le projet
        if (!fullPath.startsWith(rootDir)) {
          res.statusCode = 403;
          res.end('Accès interdit');
          return;
        }
        
        try {
          if (!fs.existsSync(fullPath)) {
            res.statusCode = 404;
            res.end(`Fichier non trouvé: ${filePath}`);
            return;
          }
          
          const stat = fs.statSync(fullPath);
          if (!stat.isFile()) {
            res.statusCode = 400;
            res.end(`Le chemin n'est pas un fichier: ${filePath}`);
            return;
          }
          
          const content = fs.readFileSync(fullPath, 'utf-8');
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(content);
        } catch (error) {
          console.error(`Erreur lors de la lecture du fichier: ${fullPath}`, error);
          res.statusCode = 500;
          res.end(`Erreur lors de la lecture du fichier: ${error.message}`);
        }
      });
    }
  };
}
