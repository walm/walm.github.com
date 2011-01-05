
desc "list tasks"
task :default do
  system "rake -T"
end

desc "generate website"
task :generate => :clean do
  puts "Generating website..."
  system "rake css"
  system "rake minify"
  system "jekyll"
end

desc "generate css via compass"
task :css do
  puts "Generating css via compass"
  system "compass compile"
end

desc "watch for sass changes"
task :css_watch do
  puts "Compass watch"
  system "compass watch"
end

desc "minify javascript and css"
task :minify => :css do
  puts "Minify javascript and css.."
  system "juicer merge -s -d ./ js/main.js -o js/all.min.js --force"
  system "juicer merge -s -d ./ css/screen.css -o css/screen.min.css --force"
end

desc "remove files in _site directory"
task :clean do
  puts "Removing output..."
  Dir["_site/*"].each { |f| rm_rf(f) }
end

desc "start server in automode"
task :server => :minify do
  puts "Start server..."
  system "jekyll --server --auto"
end

