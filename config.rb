Time.zone = 'UTC'

# Templates

set :haml, { ugly: true, format: :html5 }
set :js_dir, 'assets/javascripts'
set :css_dir, 'assets/stylesheets'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'

page '/feed.xml', layout: false
page '/sitemap.xml', layout: false
page '/robots.txt', layout: false

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

page '/legal/*', layout: 'article'

# Generate feature tour pages
data.features.each do |feature|
  proxy "/features/#{feature['name']}/index.html", "/features/template.html", locals: { f: feature }, ignore: true
end

# Generate solution pages
data.solutions.each do |solution|
  proxy "/solutions/#{solution['name']}/index.html", "/solutions/template.html", locals: { s: solution }, ignore: true
end

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Markdown settings
set :markdown_engine, :kramdown
set :markdown,
    layout_engine: :slim,
    tables: true,
    autolink: true,
    auto_ids: false,
    smartypants: true,
    input: 'GFM'

# Ignore stylesheet bundle because it is handled by webpack
ignore 'stylesheets/style'

# Build-specific configuration
configure :build do
  activate :robots,
           rules: [{ user_agent: '*', disallow: %w(/) }],
           sitemap: "http://bunnywave.com/sitemap.xml"
  activate :minify_css  # For example, change the Compass output style for deployment
  activate :minify_javascript  # Minify Javascript on build
  activate :asset_hash  # Enable cache buster
  activate :relative_assets  # Use relative URLs
  # Or use a different image path
  # set :http_prefix, "/Content/images/"
  activate :gzip
end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.layout = 'blog'
  # Permalink format
  blog.permalink = '{year}/{month}/{day}/{title}.html'
  # Matcher for blog source files
  blog.sources = '{year}-{month}-{day}-{title}.html'
  blog.summary_length = 250
  blog.default_extension = '.md'
  blog.tag_template = 'tag.html'
  blog.calendar_template = 'calendar.html'
  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = 'page/{num}'
end

# Syntax highlight settings
activate :syntax

# Activate Directory Indexes
activate :directory_indexes

# Sprocket Asset Compilation
activate :sprockets
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  Dir.glob(File.join("#{root}", @bower_config["directory"], "*", "fonts")) do |f|
    sprockets.append_path f
  end
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

activate :rsync do |rsync|
  rsync.production_server = "eduapp"
  # rsync.staging_server = "staging.myapp.com"
  rsync.path = '/var/www/tms/shared/public'
  rsync.user = "ubuntu"

  # Optional:
  # rsync.rsync_flags = "--compress --archive --delete -v"
  rsync.rsync_flags = "--compress --archive -v"
end
