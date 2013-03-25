$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "bcms_my401k_presentation/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
      s.add_dependency "browsercms", "~> 3.5.5"

  s.name        = "bcms_my401k_presentation"
  s.version     = BcmsMy401kPresentation::VERSION
  s.authors     = ["David C. Vezzani"]
  s.email       = ["dave@reliacode.com"]
  s.homepage    = ""
  s.summary     = "Summary of BcmsMy401kLibrary.  Holds My401k library products, including articles."
  s.description = "Description of BcmsMy401kLibrary."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.files -= Dir['lib/tasks/module_tasks.rake']
  s.files -= ['MIT-LICENSE']
  s.test_files = Dir["test/**/*"]

  # Depend on BrowserCMS,rather than Rails 
  # s.add_dependency "rails", "~> 3.2.13"
  # s.add_dependency "jquery-rails"

  # s.add_development_dependency "sqlite3"

end
