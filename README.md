------COMO ENVIAR LOS AVANCES -----

Guardas los cambios preparados:----

git add .

Creas una foto del avance con su descripción:----

Bsh
git commit -m "Agregado efecto de video al hacer hover en tarjetas"

Envías el avance a la nube:----

git push


--------------------Seguridad a implementar----------------

1.Cifrado TLS/HTTPS

2. Validación HTML5 (formulario)
<input type="email" required maxlength="100">
<textarea required maxlength="500"></textarea>

3. Mitigación XSS

4. Enlaces Seguros (WhatsApp)
<a href="https://wa.me/521XXXXXXXXXX" 
   target="_blank" 
   rel="noopener noreferrer">Contactar por WhatsApp</a>

Dado que GitHub Pages aloja únicamente archivos estáticos y no ejecuta procesamiento backend (PHP/Node.js), el procesamiento del formulario de contacto requiere una solución adecuada a la complejidad del sitio

-mailto al hacer clic sobre él, le indica al navegador que abra la aplicación de correo electrónico predeterminada del usuario  con un mensaje nuevo dirigido a la dirección especificada.

<a href="mailto:contacto@miarte.com?subject=Consulta%20de%20obra">Enviar correo a la artista</a>