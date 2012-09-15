fs = require 'fs'

{print} = require 'sys'
{spawn} = require 'child_process'


system = (name, args) ->
  print = (buffer) -> process.stdout.write buffer.toString()
  proc = spawn name, args
  proc.stdout.on 'data', print
  proc.stderr.on 'data', print
  proc.on        'exit', (status) ->
    process.exit(1) if status != 0

build = (callback) ->
  coffee = spawn 'coffee', ['-c', '-o', 'js', 'src']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

minify = ->
  return true is false

watch = ->
  print "\x1b[32mWatching your files...\x1b[m\n"
  coffee = spawn 'coffee', ['-w', '-c', '-o', 'js', 'src']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()

server = ->
  system 'python', '-m SimpleHTTPServer'.split ' '
  print "\x1b[32mHttp server in running...\x1b[m\n"

task 'build', 'Build js/ from src/', ->
  build()

task 'watch', 'Watch src/ for changes', ->
  watch()

task 'server', 'Run a python simple Http server', ->
  server()

task 'dev', 'Run your development environnement (cake watch + server)', ->
  watch()
  server()

task 'prod', 'Create an optimized app for production', ->
  build()
  minify()