require 'cms/module_installation'

class BcmsMy401kPresentation::InstallGenerator < Cms::ModuleInstallation
  add_migrations_directory_to_source_root __FILE__
  
  
  def copy_migrations
    rake 'bcms_my401k_presentation:install:migrations'
  end

  # Uncomment to add module specific seed data to a project.
  #def add_seed_data_to_project
  #  copy_file "../bcms_my401k_presentation.seeds.rb", "db/bcms_my401k_presentation.seeds.rb"
  #  append_to_file "db/seeds.rb", "load File.expand_path('../bcms_my401k_presentation.seeds.rb', __FILE__)\n"
  #end
  
  def add_routes
    mount_engine(BcmsMy401kPresentation)
  end
    
end